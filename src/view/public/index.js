import { Switch, Redirect, Route } from "react-router-dom";
import { Public_Profix } from "../../config";
import Home from "./home";
import Error from "./404error";

const PublicPage = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={Public_Profix} />
      </Route>
      <Route path={Public_Profix} component={Home} />
      <Route path="/*" component={Error} />
    </Switch>
  );
};
export default PublicPage;
