import { Button, Card, OceanRoot } from "@ocean-ui/ocean";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Web3ReactProviders from "./utils/web3-react-providers";
import { UilEstate } from "@iconscout/react-unicons";
import { getTheme } from "./theme";
import Builder from "./builder";
import Admin from "./admin";
import { FlexColumnCenter } from "./components/flex";

export default function App() {
  return (
    <OceanRoot theme={getTheme("dark")}>
      <BrowserRouter>
        <Web3ReactProviders>
          <Switch>
            <Route exact path="/">
              <Builder />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Web3ReactProviders>
      </BrowserRouter>
    </OceanRoot>
  );
}

function Error404() {
  const history = useHistory();

  return (
    <FlexColumnCenter style={{ height: "100vh" }}>
      <Card
        footer={
          <>
            <span></span>
            <Button primary onClick={() => history.push("/")}>
              <UilEstate />
              <span>Back Home</span>
            </Button>
          </>
        }
      >
        <h1>Page not found</h1>
        <p>
          The page you are looking for doesn't seem to exist. Click the button
          below to go back home
        </p>
      </Card>
    </FlexColumnCenter>
  );
}
