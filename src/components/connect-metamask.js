import { Button } from "@ocean-ui/ocean";
import { useEffect, useState } from "react";
import MaterialSpinner from "react-spinner-material";
import { useEagerConnect } from "../utils/use-eager-connect";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../connectors";

export default function ConnectMetamask() {
  const [connecting, setConnecting] = useState("eager");
  const [error, setError] = useState("");
  const [tried, triedError] = useEagerConnect();
  const { active, activate, chainId } = useWeb3React();

  useEffect(() => {
    if (tried && connecting === "eager") {
      setConnecting(false);
    }
  }, [tried, connecting]);

  return (
    <Button
      primary={!error && !triedError}
      wide
      disabled={active || connecting || error}
      destructive={!!error || !!triedError}
      onClick={async () => {
        setConnecting(true);
        activate(injected, undefined, true)
          .then(() => {
            setConnecting(false);
          })
          .catch((e) => {
            if (e instanceof UnsupportedChainIdError)
              setError(
                e.message
              );
            setConnecting(false);
          });
      }}
    >
      {error}
      {triedError}
      {!connecting && !error && !active && "🦊 Connect MetaMask"}
      {connecting && (
        <MaterialSpinner radius={20} stroke={2} visible={true} color="#fff" />
      )}
    </Button>
  );
}
