import { Switch, Redirect, Route } from "react-router-dom";
import { Public_Profix, Public_Pay, Public_Special } from "../../config";
import Pay from "./pay";
import Error from "./404error";
import Special from "./specialnft";

const PublicPage = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={Public_Profix} />
      </Route>
      <Route path={Public_Pay} component={Pay} />
      <Route path={Public_Special} component={Special} />
      <Route path="/*" component={Error} />
    </Switch>
  );
};
export default PublicPage;
