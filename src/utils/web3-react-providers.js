import { Web3ReactProvider, } from "@web3-react/core";
import getLibrary from "./get-library";

export default function Web3ReactProviders({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}
