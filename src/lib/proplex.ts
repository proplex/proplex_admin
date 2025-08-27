// proplex.ts - Frontend integration for Proplex Smart Contracts using Ethers v5
// To use this file, you need to install ethers.js:
// npm install ethers@5.7.2
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Contract Addresses (Avalanche Fuji Testnet)
export const CONTRACT_ADDRESSES = {
  PROPLEX_TOKEN: '0x0Acc1f0C68150f2928dF9F3B316BD062a5562F8F',
  USDC_MOCK: '0xa6401adAd919ea6Ec9929716a19DDFf62bc3Bc1C',
  USDT_MOCK: '0xe66ae37Bc0982825b5F8b37821b42d3B2d04D085',
  REGISTRY: '0x58C9Fc2877679207fB382281b82D18262AcDbbD3',
  COMPANY_FACTORY: '0x2E275Be0Db062c9fC5a0A02Af9084f3b948F7c42',
  REAL_ESTATE_TOKEN_FACTORY: '0x5Ba212974EFF69748811CE57c5ce58eDfeb66B9f',
  ESCROW: '0x2928D9Efe70c4a56a8A3Cff5d304f3626e60e5F3',
  ORDER_MANAGER: '0x0C13bB0C887b6aBdbe6D4301B8dc67886617641a',
  DAO: '0x938749EA4883A4987508b40EE28BB337dBC97c5D'
};

// Contract ABIs
export const PROPLEX_TOKEN_ABI = [
  'constructor()',
  'function mint(address to, uint256 amount)',
  'function decimals() view returns (uint8)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function nonces(address owner) view returns (uint256)',
  'function owner() view returns (address)',
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
  'function renounceOwnership()',
  'function setNameSymbol(string name_, string symbol_)',
  'function transferOwnership(address newOwner)',
  'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)'
];

export const COMPANY_FACTORY_ABI = [
  'constructor(address _impl)',
  'function initialize(address _impl)',
  'function setImpl(address _new)',
  'function deployCompany(uint8 companyType, bytes32 name, bytes32 jurisdiction) returns (uint256 id, address proxy)',
  'function companiesOf(address owner) view returns (uint256[])',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address impl)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function VERSION() view returns (string)',
  'function companyAt(uint256) view returns (address)',
  'function ownerIds(address, uint256) view returns (uint256)',
  'function companyImpl() view returns (address)',
  'function companyCounter() view returns (uint256)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)'
];

export const REGISTRY_ABI = [
  'constructor()',
  'function initialize()',
  'function registerCompany(address owner, bytes32 name, bytes32 jurisdiction, uint8 companyType) returns (uint256 id)',
  'function registerProject(uint256 companyId, bytes32 name, bytes32 symbol, bytes32 metadataCID, bytes32 legalCID, uint8 assetType, address projectAddress, address escrow, address orderManager, address dao) returns (uint256 id)',
  'function deactivateProject(uint256 projectId)',
  'function updateMetadata(uint256 projectId, bool isLegal, bytes32 newCID)',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address impl)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function VERSION() view returns (string)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)',
  'function getCompany(uint256 id) view returns (tuple)',
  'function getProject(uint256 id) view returns (tuple)',
  'function projectIdsByCompany(uint256 companyId) view returns (uint256[])',
  'function companyOf(address) view returns (uint256)',
  'function projectIdsOf(uint256, uint256) view returns (uint256)',
  'function companies(uint256) view returns (address owner, uint8 companyType, bool isActive, bytes24 __gap, bytes32 name, bytes32 jurisdiction)',
  'function projects(uint256) view returns (address projectAddress, address escrow, address orderManager, address dao, uint8 assetType, bool isActive, bytes10 __gap, bytes32 name, bytes32 symbol, bytes32 metadataCID, bytes32 legalCID)',
  'function companyCount() view returns (uint256)',
  'function projectCount() view returns (uint256)'
];

export const REAL_ESTATE_TOKEN_FACTORY_ABI = [
  'constructor()',
  'function initialize(address _usdc, address _usdt, address _proplexXToken, address _projectTemplate, address _escrowTemplate, address _orderManagerTemplate, address _daoTemplate)',
  'function deployProject(tuple p, uint8 coin) returns (address project, address escrow, address orderManager, address dao)',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address newImpl)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function usdc() view returns (address)',
  'function usdt() view returns (address)',
  'function proplexXToken() view returns (address)',
  'function projectTemplate() view returns (address)',
  'function escrowTemplate() view returns (address)',
  'function orderManagerTemplate() view returns (address)',
  'function daoTemplate() view returns (address)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)'
];

export const ESCROW_ABI = [
  'constructor()',
  'function initialize(address _usdt, address _usdc, address _project, address _owner)',
  'function setCoreContracts(address _usdt, address _usdc, address _project)',
  'function setRequiredSignatures(uint8 _sigs)',
  'function deposit(bytes32 orderId, address buyer, uint128 amount, uint8 token, bytes32 assetId)',
  'function signRelease(bytes32 orderId, address to, uint128 amount)',
  'function depositDividend(uint8 token, uint128 amount)',
  'function distributeDividend(address recipient, uint8 token, uint128 amount)',
  'function raiseDispute(bytes32 orderId, string reason) returns (bytes32 disputeId)',
  'function signDisputeResolution(bytes32 disputeId, address resolvedTo)',
  'function emergencyWithdraw(address recipient, uint8 token, uint128 amount)',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address newImpl)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function usdt() view returns (address)',
  'function usdc() view returns (address)',
  'function project() view returns (address)',
  'function disputeNonce() view returns (uint32)',
  'function requiredSigs() view returns (uint8)',
  'function dividendPoolUSDT() view returns (uint128)',
  'function dividendPoolUSDC() view returns (uint128)',
  'function deposits(bytes32) view returns (address buyer, uint128 amount, uint8 token, bytes32 assetId)',
  'function disputes(bytes32) view returns (address buyer, uint8 token, uint128 amount, bytes32 assetId, bytes32 orderId, uint48 disputeTimeout, uint48 disputeExpiration, address resolvedTo, bool resolved)',
  'function releaseSigCount(bytes32) view returns (uint256)',
  'function disputeSigCount(bytes32) view returns (uint256)',
  'function releaseSigned(bytes32, address) view returns (bool)',
  'function disputeSigned(bytes32, address) view returns (bool)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)',
  'function getDisputeStatus(bytes32 id) view returns (tuple)',
  'function dividendPoolBalance(uint8 token) view returns (uint128)'
];

export const ORDER_MANAGER_ABI = [
  'constructor()',
  'function initialize(address _escrow, address _project, address _owner)',
  'function setCurrency(uint8 c, address token, bool active)',
  'function setProjectContracts(address _escrow, address _project)',
  'function setRequiredSignatures(uint8 n)',
  'function setPlatformFee(uint16 bps)',
  'function setFeeRecipient(address a)',
  'function placeOrder(tuple p) returns (bytes32 id)',
  'function signDocuments(bytes32 id)',
  'function finalizeOrder(bytes32 id)',
  'function cancelOrder(bytes32 id)',
  'function signRelease(bytes32 id)',
  'function resolveStuckOrder(bytes32 id)',
  'function emergencyWithdraw(uint8 c, address to, uint128 amount)',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address impl)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function OPERATOR_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function currencies(uint8) view returns (address token, uint8 decimals, bool active)',
  'function escrow() view returns (address)',
  'function project() view returns (address)',
  'function requiredSigs() view returns (uint8)',
  'function platformFeeBps() view returns (uint16)',
  'function feeRecipient() view returns (address)',
  'function orders(bytes32) view returns (address buyer, uint128 amountTokens, uint128 totalCurrency, uint128 fees, bytes32 assetId, uint48 createdAt, uint48 orderExpiry, uint48 releaseAfter, uint8 status, uint8 currency, address projectAddress, address escrowAddress, bool released)',
  'function releaseSig(bytes32, address) view returns (bool)',
  'function releaseSigCount(bytes32) view returns (uint8)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)',
  'function getOrder(bytes32 id) view returns (tuple)',
  'function currencyInfo(uint8 c) view returns (tuple)',
  'function isSupported(uint8 c) view returns (bool)',
  'function hasSignedRelease(bytes32 id, address signer) view returns (bool)'
];

export const DAO_ABI = [
  'constructor()',
  'function initialize(address _project, address _proplexXToken, uint8 _quorumThreshold)',
  'function setCoreContracts(address _proplexXToken, address _project)',
  'function setGovernanceParams(uint8 _requiredSignatures, uint8 _quorumThreshold)',
  'function propose(string description, uint48 delay)',
  'function vote(uint256 proposalId, bool support)',
  'function signProposal(uint256 proposalId)',
  'function executeFallback(uint256 proposalId)',
  'function addSigner(address signer)',
  'function revokeSigner(address signer)',
  'function pause()',
  'function unpause()',
  'function _authorizeUpgrade(address newImplementation)',
  'function ADMIN_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function proplexXToken() view returns (address)',
  'function project() view returns (address)',
  'function proposalCount() view returns (uint16)',
  'function requiredSatures() view returns (uint8)',
  'function quorumThreshold() view returns (uint8)',
  'function proposals(uint256) view returns (uint48 startTime, uint48 endTime, uint48 deadline, uint40 forVotes, uint40 againstVotes, uint8 signatureCount, bool executed)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function proxiableUUID() view returns (bytes32)',
  'function paused() view returns (bool)',
  'function getProposalStatus(uint256 proposalId) view returns (tuple)'
];

// Utility functions for interacting with contracts
export class ProplexSDK {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;
  
  public registry: ethers.Contract;
  public companyFactory: ethers.Contract;
  public proplexToken: ethers.Contract;
  public usdcMock: ethers.Contract;
  public usdtMock: ethers.Contract;
  public realEstateTokenFactory: ethers.Contract;
  public escrow: ethers.Contract;
  public orderManager: ethers.Contract;
  public dao: ethers.Contract;
  
  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
    
    // Initialize contracts
    this.registry = new ethers.Contract(
      CONTRACT_ADDRESSES.REGISTRY,
      REGISTRY_ABI,
      this.signer
    );
    
    this.companyFactory = new ethers.Contract(
      CONTRACT_ADDRESSES.COMPANY_FACTORY,
      COMPANY_FACTORY_ABI,
      this.signer
    );
    
    this.proplexToken = new ethers.Contract(
      CONTRACT_ADDRESSES.PROPLEX_TOKEN,
      PROPLEX_TOKEN_ABI,
      this.signer
    );
    
    this.usdcMock = new ethers.Contract(
      CONTRACT_ADDRESSES.USDC_MOCK,
      PROPLEX_TOKEN_ABI,
      this.signer
    );
    
    this.usdtMock = new ethers.Contract(
      CONTRACT_ADDRESSES.USDT_MOCK,
      PROPLEX_TOKEN_ABI,
      this.signer
    );
    
    this.realEstateTokenFactory = new ethers.Contract(
      CONTRACT_ADDRESSES.REAL_ESTATE_TOKEN_FACTORY,
      REAL_ESTATE_TOKEN_FACTORY_ABI,
      this.signer
    );
    
    this.escrow = new ethers.Contract(
      CONTRACT_ADDRESSES.ESCROW,
      ESCROW_ABI,
      this.signer
    );
    
    this.orderManager = new ethers.Contract(
      CONTRACT_ADDRESSES.ORDER_MANAGER,
      ORDER_MANAGER_ABI,
      this.signer
    );
    
    this.dao = new ethers.Contract(
      CONTRACT_ADDRESSES.DAO,
      DAO_ABI,
      this.signer
    );
  }
  
  // Get signer address
  async getSignerAddress(): Promise<string> {
    return await this.signer.getAddress();
  }
  
  // Register a new company
  async registerCompany(
    owner: string,
    name: string,
    jurisdiction: string,
    companyType: number
  ): Promise<ethers.ContractTransaction> {
    const nameBytes32 = ethers.utils.formatBytes32String(name);
    const jurisdictionBytes32 = ethers.utils.formatBytes32String(jurisdiction);
    
    return await this.registry.registerCompany(
      owner,
      nameBytes32,
      jurisdictionBytes32,
      companyType
    );
  }
  
  // Deploy a new company using the factory
  async deployCompany(
    companyType: number,
    name: string,
    jurisdiction: string
  ): Promise<ethers.ContractTransaction> {
    const nameBytes32 = ethers.utils.formatBytes32String(name);
    const jurisdictionBytes32 = ethers.utils.formatBytes32String(jurisdiction);
    
    return await this.companyFactory.deployCompany(
      companyType,
      nameBytes32,
      jurisdictionBytes32
    );
  }
  
  // Get company details
  async getCompany(id: number): Promise<any> {
    return await this.registry.getCompany(id);
  }
  
  // Get companies owned by an address
  async getCompaniesOf(owner: string): Promise<number[]> {
    return await this.companyFactory.companiesOf(owner);
  }
  
  // Mint tokens (for testing purposes)
  async mintTokens(tokenAddress: string, to: string, amount: ethers.BigNumberish): Promise<ethers.ContractTransaction> {
    const token = new ethers.Contract(tokenAddress, PROPLEX_TOKEN_ABI, this.signer);
    return await token.mint(to, amount);
  }
  
  // Approve token spending
  async approveToken(tokenAddress: string, spender: string, amount: ethers.BigNumberish): Promise<ethers.ContractTransaction> {
    const token = new ethers.Contract(tokenAddress, PROPLEX_TOKEN_ABI, this.signer);
    return await token.approve(spender, amount);
  }
  
  // Get token balance
  async getTokenBalance(tokenAddress: string, account: string): Promise<ethers.BigNumber> {
    const token = new ethers.Contract(tokenAddress, PROPLEX_TOKEN_ABI, this.provider);
    return await token.balanceOf(account);
  }
  
  // Register a new project/asset
  async registerProject(
    companyId: number,
    name: string,
    symbol: string,
    metadataCID: string,
    legalCID: string,
    assetType: number
  ): Promise<ethers.ContractTransaction> {
    const nameBytes32 = ethers.utils.formatBytes32String(name);
    const symbolBytes32 = ethers.utils.formatBytes32String(symbol);
    const metadataCIDBytes32 = ethers.utils.formatBytes32String(metadataCID);
    const legalCIDBytes32 = ethers.utils.formatBytes32String(legalCID);
    
    // Get the deployed contract addresses from the real estate token factory
    const deployedContracts = await this.realEstateTokenFactory.deployProject({
      name: nameBytes32,
      symbol: symbolBytes32,
      metadataCID: metadataCIDBytes32,
      legalCID: legalCIDBytes32,
      assetType: assetType,
      companyId: companyId
    }, 0); // 0 for USDC as default currency
    
    return await this.registry.registerProject(
      companyId,
      nameBytes32,
      symbolBytes32,
      metadataCIDBytes32,
      legalCIDBytes32,
      assetType,
      deployedContracts.project,
      deployedContracts.escrow,
      deployedContracts.orderManager,
      deployedContracts.dao
    );
  }
}

// Export types for convenience
export type CompanyType = 
  | "LLC"
  | "PRIVATELIMITED"
  | "DAOLLC"
  | "CORPORATION"
  | "PUBLICENTITY"
  | "PARTNERSHIP";

export type AssetType = 
  | "Commercial"
  | "Residential"
  | "Holiday"
  | "Land";

export interface Company {
  owner: string;
  companyType: CompanyType;
  isActive: boolean;
  name: string;
  jurisdiction: string;
}

export interface Project {
  projectAddress: string;
  escrow: string;
  orderManager: string;
  dao: string;
  assetType: AssetType;
  isActive: boolean;
  name: string;
  symbol: string;
  metadataCID: string;
  legalCID: string;
}