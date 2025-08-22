import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId = "BI0orjBmrDL-uiYLcrZ7uwH6jczl6Fatfh4N4GLY0voY5oJ_3U2BN7QAzejT1mmbne5VtR_0_16wM4jDKq7M_UE"; // get from https://dashboard.web3auth.io

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    
    
  }
};

export default web3AuthContextConfig;