import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import { isMobile } from "react-device-detect";

export function useEagerConnect() {
  const { activate, active } = useWeb3React(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);
  const [error, setError] = useState("");

  const _handleError = (e) => {
    if (e instanceof UnsupportedChainIdError) {
      setError("Unsupported Chain. Please use MAINNET(1), ROPSTEN(3) or BSC(56) chains")
    }
  }

  useEffect(() => {
    if (active) return;
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        }).catch((e) => {
          _handleError(e);
          setTried(true)
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          }).catch((e) => {
            _handleError(e);
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate, active]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return [tried, error];
}
