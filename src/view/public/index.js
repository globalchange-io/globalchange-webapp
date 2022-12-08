import { Switch, Redirect, Route } from "react-router-dom";
import { Public_Profix, Public_Wallet } from "../../config";
import Home from "./home";
import Error from "./404error";
import Walletpage from "./walletpage";

const PublicPage = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={Public_Profix} />
      </Route>
      <Route path={Public_Profix} component={Home} />
      <Route path={Public_Wallet} component={Walletpage} />
      <Route path="/*" component={Error} />
    </Switch>
  );
};
export default PublicPage;
