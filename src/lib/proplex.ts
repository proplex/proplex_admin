import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

// Contract ABIs

import proplexCompany from './ABIs/ProplexCompany.json';
import ProplexCompanyFactoryABI  from './ABIs/ProplexCompanyFactory.json';
import ProplexDao from './ABIs/ProplexDao.json';
import ProplexEscrow from './ABIs/ProplexEscrow.json';
import ProplexOrderManagerABI from './ABIs/ProplexOrderManager.json';
import ProplexProjectToken from './ABIs/ProplexProjectToken.json';
import ProplexRealEstateToken from './ABIs/ProplexRealEstateToken.json';
import ProplexRealEstateTokenFactoryABI from './ABIs/ProplexRealEstateTokenFactory.json';
import ProplexRegistry from './ABIs/ProplexRegistry.json';



// Contract addresses
export const CONTRACT_ADDRESSES = {
  ProplexRegistry: '0xCb3057b67856f41106ca84eac0EA901D9cC6A81b',
  ProplexCompanyFactory: '0x8180b9273371fDce9c80B1F2DE7d54158FAc6eb9',
  ProplexRealEstateTokenFactory: '0x851eB7027dB7baBbbC1EFF22c4b0566d31B0cF38',

};

// Network configuration
const NETWORK_CONFIG = {
  name: 'U2U Testnet',
  chainId: 2484,
  rpcUrl: 'https://rpc-testnet.uniultra.xyz',
  blockExplorer: 'https://testnet.u2uscan.xyz',};

// Initialize provider and signer
const provider = new JsonRpcProvider(NETWORK_CONFIG.rpcUrl, {
  chainId: NETWORK_CONFIG.chainId,
  name: NETWORK_CONFIG.name,
});

// Initialize contract instances
const getContract = (address: string, abi: any, signer?: ethers.Signer) => {
  return new ethers.Contract(address, abi, signer || provider);
};

// Main Proplex class for interacting with the protocol
export class ProplexSDK {
  private provider: ethers.providers.Provider;
  private signer?: ethers.Signer;

  constructor(privateKeyOrSigner: string | ethers.Signer) {
    // Initialize the provider
    this.provider = provider;
    
    if (typeof privateKeyOrSigner === 'string') {
      this.signer = new ethers.Wallet(privateKeyOrSigner, provider);
    } else {
      this.signer = privateKeyOrSigner;
    }
  }

  // Method to get the signer address
  async getSignerAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('No signer available');
    }
    return await this.signer.getAddress();
  }

  // Company Factory Methods
  /**
   * Deploys a new ProplexCompany contract
   * @param companyType Type of the company (0 = Developer, 1 = Builder, 2 = Broker, 3 = FinancialInstitution)
   * @param name Name of the company (max 32 bytes)
   * @param jurisdiction Jurisdiction of the company (max 32 bytes)
   * @param overrides Optional transaction overrides (gas limit, gas price, etc.)
   * @returns Promise with the transaction receipt and the company ID
   */
  async deployCompany(
    companyType: number,
    name: string,
    jurisdiction: string,
    overrides?: ethers.Overrides
  ): Promise<{ id: number; proxy: string }> {
    const companyFactory = getContract(
      CONTRACT_ADDRESSES.ProplexCompanyFactory,
      ProplexCompanyFactoryABI.abi,
      this.signer
    );

    // Convert strings to bytes32
    const nameBytes32 = ethers.utils.formatBytes32String(name);
    const jurisdictionBytes32 = ethers.utils.formatBytes32String(jurisdiction);

    // Set default gas limit if not provided
    const txOverrides = overrides || {
      gasLimit: 5000000 // Set a reasonable default gas limit
    };
    console.log("final proplex side paylaod is here:",companyType,nameBytes32,jurisdictionBytes32,txOverrides);

    try {
      const tx = await companyFactory.deployCompany(
        companyType,
        nameBytes32,
        jurisdictionBytes32,
        txOverrides
      );

      const receipt = await tx.wait();
      const event = receipt.events?.find((e: any) => e.event === 'CompanyDeployed');
      
      if (!event) {
        throw new Error('Company deployment event not found');
      }

      return {
        id: event.args.id.toNumber(),
        proxy: event.args.proxy
      };
    } catch (error: any) {
      console.error('Error deploying company:', error);
      // Re-throw with more context
      if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        throw new Error(`Cannot estimate gas for company deployment. This may be due to invalid parameters or contract issues. Details: ${error.message}`);
      }
      throw error;
    }
  }

  // Real Estate Token Factory Methods
  /**
   * Deploys a new real estate token project with all required contracts
   * @param params Deployment parameters for the project
   * @returns Promise with the deployed contract addresses
   */
  async deployProject(params: {
    identityRegistry: string;
    compliance: string;
    onchainID: string;
    name: string;
    symbol: string;
    decimals: number;
    maxSupply: string;
    tokenPrice: string;
    cancelDelay: number;
    projectOwner: string;
    assetId: string;
    metadataCID: string;
    assetType: number; // 0 = Residential, 1 = Commercial, etc.
    legalMetadataCID: string;
    dividendPct: number;
    preMintAmount: string;
    minInvestment: string;
    maxInvestment: string;
  }): Promise<{
    project: string;
    escrow: string;
    orderManager: string;
    dao: string;
  }> {
    const tokenFactory = getContract(
      CONTRACT_ADDRESSES.ProplexRealEstateTokenFactory,
      ProplexRealEstateTokenFactoryABI.abi,
      this.signer
    );

    // Convert string parameters to proper types
    const deployParams = {
      ...params,
      maxSupply: ethers.utils.parseEther(params.maxSupply),
      tokenPrice: ethers.utils.parseEther(params.tokenPrice),
      cancelDelay: params.cancelDelay,
      metadataCID: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(params.metadataCID)),
      legalMetadataCID: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(params.legalMetadataCID)),
      preMintAmount: ethers.utils.parseEther(params.preMintAmount),
      minInvestment: ethers.utils.parseEther(params.minInvestment),
      maxInvestment: ethers.utils.parseEther(params.maxInvestment),
      assetId: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(params.assetId)),
      // Convert assetType to enum
      assetType: params.assetType as any
    };

    const tx = await tokenFactory.deployProject(deployParams);
    const receipt = await tx.wait();
    
    const event = receipt.events?.find((e: any) => e.event === 'ProjectDeployed');
    if (!event) {
      throw new Error('Project deployment event not found');
    }

    return {
      project: event.args.project,
      escrow: event.args.escrow,
      orderManager: event.args.orderManager,
      dao: event.args.dao
    };
  }

  // Order Manager Methods
  /**
   * Places a new order for a real estate token
   * @param params Order parameters
   * @returns Promise with the order ID
  //  */
  // async placeOrder(params: {
  //   projectAddress: string;
  //   escrowAddress: string;
  //   assetId: string;
  //   amountTokens: string; // in wei
  //   feesWei: string; // in wei
  // }): Promise<string> {
  //   const orderManager = getContract(
  //     CONTRACT_ADDRESSES.ProplexOrderManager,
  //     ProplexOrderManagerABI.abi,
  //     this.signer
  //   );

  //   // Convert string parameters to proper types
  //   const orderParams = {
  //     projectAddress: params.projectAddress,
  //     escrowAddress: params.escrowAddress,
  //     assetId: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(params.assetId)),
  //     amountTokens: params.amountTokens,
  //     feesWei: params.feesWei
  //   };

  //   // Calculate the total ETH value needed for the order
  //   const tokenPrice = await this.getTokenPrice(params.projectAddress);
  //   const value = BigInt(params.amountTokens) * BigInt(tokenPrice) / BigInt(1e18);
  //   const platformFee = await this.getPlatformFee(value);
  //   const totalValue = value + platformFee + BigInt(params.feesWei);

  //   const tx = await orderManager.placeOrder(
  //     orderParams,
  //     { value: totalValue.toString() }
  //   );

  //   const receipt = await tx.wait();
  //   const event = receipt.events?.find((e: any) => e.event === 'OrderPlaced');
    
  //   if (!event) {
  //     throw new Error('Order placement event not found');
  //   }

  //   return event.args.id;
  // }

  /**
   * Gets the token price from the ProplexRealEstateToken contract
   * @param tokenAddress Address of the token
   * @returns Token price in wei
   */
  private async getTokenPrice(tokenAddress: string): Promise<string> {
    const token = new ethers.Contract(
      tokenAddress,
      ['function tokenPrice() view returns (uint256)'],
      provider
    );
    return (await token.tokenPrice()).toString();
  }

  /**
   * Gets the platform fee for an order
   * @param value Value of the order in wei
   * @returns Platform fee in wei
   */
  // private async getPlatformFee(value: bigint): Promise<bigint> {
  //   const orderManager = getContract(
  //     CONTRACT_ADDRESSES.ProplexOrderManager,
  //     ProplexOrderManagerABI.abi,
  //     this.signer
  //   );
  //   const platformFeeBps = await orderManager.platformFeeBps();
  //   return (value * BigInt(platformFeeBps)) / BigInt(10000); // 10000 = 100%
  // }

  /**
   * Finalizes an existing order
   * @param orderId ID of the order to finalize
   * @returns Promise that resolves when the transaction is mined
  //  */
  // async finalizeOrder(orderId: string): Promise<ethers.ContractReceipt> {
  //   const orderManager = getContract(
  //     CONTRACT_ADDRESSES.ProplexOrderManager,
  //     ProplexOrderManagerABI.abi,
  //     this.signer
  //   );

  //   const tx = await orderManager.finalizeOrder(orderId);
  //   const receipt = await tx.wait();
    
  //   if (receipt.status !== 1) {
  //     throw new Error('Transaction failed');
  //   }
    
  //   return receipt;
  // }

  // Utility Methods
  async getBalance(tokenAddress: string, address?: string) {
    const token = new ethers.Contract(
      tokenAddress,
      ['function balanceOf(address) view returns (uint256)'],
      this.provider
    );
    
    let useAddress: string;
    if (address) {
      useAddress = address;
    } else if (this.signer) {
      useAddress = await this.signer.getAddress();
    } else {
      throw new Error('No address provided and no signer available');
    }
    
    const balance = await token.balanceOf(useAddress);
    return ethers.utils.formatEther(balance);
  }

  /**
   * Utility method to check if the contract is deployed at the expected address
   */
  async isContractDeployed(address: string): Promise<boolean> {
    try {
      const code = await this.provider.getCode(address);
      return code !== '0x';
    } catch (error) {
      console.error('Error checking contract deployment:', error);
      return false;
    }
  }

  /**
   * Utility method to get the signer's balance
   */
  async getSignerBalance(): Promise<string> {
    if (!this.signer) {
      throw new Error('No signer available');
    }
    const address = await this.signer.getAddress();
    const balance = await this.provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  }

  /**
   * Utility method to validate contract parameters before deployment
   */
  static validateCompanyParams(name: string, jurisdiction: string): { valid: boolean; error?: string } {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'Company name is required' };
    }
    
    if (name.length > 32) {
      return { valid: false, error: 'Company name must be less than 32 characters' };
    }
    
    if (!jurisdiction || jurisdiction.trim().length === 0) {
      return { valid: false, error: 'Jurisdiction is required' };
    }
    
    if (jurisdiction.length > 32) {
      return { valid: false, error: 'Jurisdiction must be less than 32 characters' };
    }
    
    return { valid: true };
  }

  // Static helper methods
  static getProvider() {
    return provider;
  }

  static getContractAddresses() {
    return CONTRACT_ADDRESSES;
  }
}

// Example usage:
/*
async function example() {
  // Initialize SDK with private key (in production, use environment variables or secure storage)
  const privateKey = 'YOUR_PRIVATE_KEY';
  const sdk = new ProplexSDK(privateKey);

  try {
    // Deploy a new company
    const companyAddress = await sdk.deployCompany(
      'My Real Estate Company',
      'REC',
      '1000000', // 1M tokens
      'https://api.proplex.xyz/company/'
    );
    console.log('Company deployed at:', companyAddress);

    // Deploy a new project
    const tokenAddress = await sdk.deployProject(
      'Luxury Apartments',
      'LUX',
      '100', // 1K tokens
      'https://api.proplex.xyz/project/luxury-apts/',
      'Luxury apartments in downtown'
    );
    console.log('Project token deployed at:', tokenAddress);

    // Place an order
    const orderId = await sdk.placeOrder(
      tokenAddress,
      '100', // 100 tokens
      '1.5', // 1.5 ETH per token
      Math.floor(Date.now() / 1000) + 86400 // 24 hours from now
    );
    console.log('Order placed with ID:', orderId);

    // Finalize order (would typically be called by the buyer)
    // const success = await sdk.finalizeOrder(orderId);
    // console.log('Order finalized:', success);

  } catch (error) {
    console.error('Error:', error);
  }
}

example();
*/