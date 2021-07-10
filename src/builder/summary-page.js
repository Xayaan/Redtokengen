import { Summary } from "../components/summary";
import * as contracts from "../contracts";

export default function SummaryPage({ contract, contractArgs }) {
  return (
    <>
      <h1>Contract Summary</h1>
      <p>
        Your token is done! The last step is to deploy it to the blockchain!
        Before we do that, here's a summary of what arguments you selected:
      </p>
      <SummaryBody contract={contract} contractArgs={contractArgs} />
    </>
  );
}

export function SummaryBody({ contract, contractArgs }) {
  return (
    <>
      <h2>Summary</h2>
      <Summary>
        <li>Contract Type: {contracts[contract].name}</li>
        <li>Configuration:</li>
        <Summary>
          {Object.keys(contractArgs).map((arg, i) => (
            <li key={i}>
              {arg}:{" "}
              {arg === "supply"
                ? parseInt(contractArgs["supply"]) *
                  10 ** parseInt(contractArgs["decimals"] || "9")
                : contractArgs[arg]}
            </li>
          ))}
        </Summary>
      </Summary>
    </>
  );
}
