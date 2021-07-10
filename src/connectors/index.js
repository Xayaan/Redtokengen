import { InjectedConnector } from "@web3-react/injected-connector";

export const INFURA_KEY = 'b2a45820e1d74b86adbbcb030a68119c';

export const DEPLOYERS = {
  1: ``, // Mainnet deployer addresses
  3: ``, // Ropsten deployer addresses
  56: `` // Binance Smart Chain deployer addresses
};

export const SUPPORTED_CHAIN_IDS = {
  1: "MAINNET",
  3: "ROPSTEN",
  56: "BSC (BINANCE)",
}

export const injected = new InjectedConnector({
  supportedChainIds: [1,3,56]
});
