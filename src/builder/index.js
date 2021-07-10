import {
  Button,
  Card,
  Input,
  StepBar,
} from "@ocean-ui/ocean";
import { cloneElement, useState } from "react";
import { FlexColumnCenter } from "../components/flex";
import Info from "../components/info";
import * as contracts from "../contracts";
import { UilArrowRight } from "@iconscout/react-unicons";
import CoverPage from "./cover-page";
import SummaryPage from "./summary-page";
import DeployPage from "./deploy-page";

export default function Builder() {
  const [page, setPage] = useState(1);
  const [contract, setContract] = useState("ERC20");
  const [contractArgs, setContractArgs] = useState({});

  const canAdvance = () =>
    page === 1
      ? true
      : page === contracts[contract].steps.length + 2
      ? true
      : page === contracts[contract].steps.length + 3
      ? false
      : Object.keys(contracts[contract].steps[page - 2]).every((step) => {
          var _step = contracts[contract].steps[page - 2][step];
          if (_step.type === "jsx") return true;
          if (
            (_step.type === "input" && contractArgs[step]) ||
            (_step.type === "input" && !_step.required)
          )
            return true;
          return false;
        });

  return (
    <FlexColumnCenter style={{ height: "100vh" }}>
      <StepBar
        width="min(700px, calc(100vw - 40px))"
        steps={contracts[contract].steps.length + 3}
        current={page}
      />
      <Card
        width="min(700px, calc(100vw - 40px))"
        footer={
          <>
            <Button
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
                if (page === 2) setContractArgs({});
              }}
            >
              Back
            </Button>
            <Button
              primary
              disabled={!canAdvance()}
              onClick={() => canAdvance() && setPage(page + 1)}
            >
              <span>Next</span>
              <UilArrowRight />
            </Button>
          </>
        }
      >
        {page === 1 && <CoverPage contract={contract} setContract={setContract} />}
        {page > 1 && page <= contracts[contract].steps.length + 1 && (
          <>
            <h1>Configure your contract</h1>
            {Object.keys(contracts[contract].steps[page - 2]).map(
              (step, index) => {
                console.log(step);
                const getStep = (_step) =>
                  contracts[contract].steps[page - 2][_step];
                if (getStep(step).type === "jsx") {
                  return cloneElement(
                    getStep(step).content,
                    { key: index },
                    getStep(step).content.props.children
                  );
                } else if (getStep(step).type === "input") {
                  return (
                    <Input
                      type={getStep(step).inputType}
                      label={getStep(step).label}
                      placeholder={getStep(step).placeholder}
                      required={getStep(step).required}
                      value={contractArgs[step]}
                      key={index}
                      update={(value) =>
                        setContractArgs({
                          ...contractArgs,
                          [step]: value,
                        })
                      }
                    />
                  );
                } else {
                  return null;
                }
              }
            )}
          </>
        )}
        {page === contracts[contract].steps.length + 2 && (
          <SummaryPage contract={contract} contractArgs={contractArgs} />
        )}
        {page === contracts[contract].steps.length + 3 && (
          <DeployPage contract={contract} contractArgs={contractArgs} />
        )}
      </Card>
      <Info>
        <span>Copyright © 2021 - RED Chain Solutions</span>
      </Info>
    </FlexColumnCenter>
  );
}
