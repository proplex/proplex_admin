import { createAuthRequestMessage, createAuthVerifyMessage, createEIP712AuthMessageSigner, parseAnyRPCResponse, RPCMethod } from '@erc7824/nitrolite';
import { Signer } from 'ethers';
import { webSocketService } from './websocket';
import { SessionKey, getStoredSessionKey, storeSessionKey, storeJWT, removeJWT, removeSessionKey } from './auth-utils';

export class NitroliteAuth {
  private static instance: NitroliteAuth;
  private sessionKey: SessionKey | null = null;
  private account: string | null = null;
  private signer: Signer | null = null;
  private authListeners: Set<(isAuthenticated: boolean) => void> = new Set();
  private isAuthenticated = false;
  private isAuthAttempted = false;
  private sessionExpireTimestamp = '';
  private readonly AUTH_SCOPE = 'proplex-admin';
  private readonly APP_NAME = 'Proplex Admin';
  private readonly SESSION_DURATION = 3600; // 1 hour

  private constructor() {
    this.initialize();
  }

  public static getInstance(): NitroliteAuth {
    if (!NitroliteAuth.instance) {
      NitroliteAuth.instance = new NitroliteAuth();
    }
    return NitroliteAuth.instance;
  }

  private initialize() {
    // Load or generate session key
    this.sessionKey = getStoredSessionKey() || this.generateAndStoreSessionKey();
    
    // Set up WebSocket message handler
    webSocketService.addMessageListener(this.handleWebSocketMessage);
    
    // Re-authenticate on reconnection
    webSocketService.addStatusListener((status) => {
      if (status === 'Connected' && this.account) {
        this.attemptAuthentication();
      }
    });
  }

  private generateAndStoreSessionKey(): SessionKey {
    const key = {
      address: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      privateKey: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    };
    storeSessionKey(key);
    return key;
  }

  public async setupAuthentication(account: string, signer: Signer) {
    this.account = account;
    this.signer = signer;
    this.attemptAuthentication();
  }

  private async attemptAuthentication() {
    if (!this.account || !this.sessionKey || this.isAuthAttempted || webSocketService.getStatus() !== 'Connected') {
      return;
    }

    this.isAuthAttempted = true;
    this.sessionExpireTimestamp = String(Math.floor(Date.now() / 1000) + this.SESSION_DURATION);

    const authParams = {
      address: this.account as `0x${string}`,
      session_key: this.sessionKey.address as `0x${string}`,
      app_name: this.APP_NAME,
      expire: this.sessionExpireTimestamp,
      scope: this.AUTH_SCOPE,
      application: this.account as `0x${string}`,
      allowances: [],
    };

    try {
      const payload = await createAuthRequestMessage(authParams);
      webSocketService.send(payload);
    } catch (error) {
      console.error('Error creating auth request:', error);
      this.isAuthAttempted = false;
    }
  }

  private handleWebSocketMessage = async (data: any) => {
    try {
      const response = parseAnyRPCResponse(JSON.stringify(data));

      // Handle auth challenge
      if (response.method === RPCMethod.AuthChallenge && this.signer && this.sessionKey && this.account) {
        const authParams = {
          scope: this.AUTH_SCOPE,
          application: this.account as `0x${string}`,
          participant: this.sessionKey.address as `0x${string}`,
          expire: this.sessionExpireTimestamp,
          allowances: [],
        };

        try {
          const eip712Signer = createEIP712AuthMessageSigner(this.signer as any, authParams, {
            name: this.APP_NAME,
          });
          
          const authVerifyPayload = await createAuthVerifyMessage(eip712Signer, response);
          webSocketService.send(authVerifyPayload);
        } catch (error) {
          console.error('Error signing auth challenge:', error);
          this.resetAuthState();
        }
      }
      // Handle auth success
      else if (response.method === RPCMethod.AuthVerify && response.params?.success) {
        this.isAuthenticated = true;
        if (response.params.jwtToken) {
          storeJWT(response.params.jwtToken);
        }
        this.notifyListeners(true);
      }
      // Handle errors
      else if (response.method === RPCMethod.Error) {
        console.error('Authentication error:', response.params.error);
        this.resetAuthState();
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  };

  private resetAuthState() {
    this.isAuthenticated = false;
    this.isAuthAttempted = false;
    removeJWT();
    removeSessionKey();
    this.notifyListeners(false);
  }

  public getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  public addAuthListener(listener: (isAuthenticated: boolean) => void): () => void {
    this.authListeners.add(listener);
    // Initial call with current state
    listener(this.isAuthenticated);
    
    // Return cleanup function
    return () => this.authListeners.delete(listener);
  }

  private notifyListeners(isAuthenticated: boolean) {
    this.authListeners.forEach(listener => listener(isAuthenticated));
  }

  public logout() {
    this.resetAuthState();
    this.sessionKey = this.generateAndStoreSessionKey();
  }
}

export const nitroliteAuth = NitroliteAuth.getInstance();
