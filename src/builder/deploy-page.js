import ConnectMetamask from "../components/connect-metamask";
// import * as contracts from "../contracts";
import { useWeb3React } from "@web3-react/core";
import { Button } from "@ocean-ui/ocean";
import { UilCloudUpload } from "@iconscout/react-unicons";
import { SummaryBody } from "./summary-page";
import { SUPPORTED_CHAIN_IDS } from "../connectors";
// import styled from "styled-components";

// const FlexRowSpread = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-flow: row nowrap;
//   button {
//     white-space: pre;
//   }
// `;

export default function DeployPage({ contract, contractArgs }) {
  const { active, chainId } = useWeb3React();
  const web3 = useWeb3React();
  console.log("web3", web3);

  return (
    <>
      <h1>Deploy Contract</h1>
      <p>
        Now for the last step! Connect to this app to metamask to deploy your
        contract.
      </p>
      <p>
        <strong>Important note:</strong> Deploying a contract costs some
        ethereum. Make sure not to deploy if you're not absolutely sure that you
        want to.
      </p>
      <SummaryBody contract={contract} contractArgs={contractArgs} />
      {!active && <ConnectMetamask />}
      {(active) && (
        <Button
          primary={SUPPORTED_CHAIN_IDS[chainId]}
          wide
          style={{ flexGrow: 1 }}
          destructive={!SUPPORTED_CHAIN_IDS[chainId]}
          disabled={!SUPPORTED_CHAIN_IDS[chainId]}
        >
          <UilCloudUpload />
          <span>
            {SUPPORTED_CHAIN_IDS[chainId]
              ? `Deploy Contract to ${
                  SUPPORTED_CHAIN_IDS[chainId]
                }`
              : "Unsupported Network"}
          </span>
        </Button>
      )}
    </>
  );
}
