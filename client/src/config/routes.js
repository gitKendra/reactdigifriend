// Inclue the React library
import React from "react";

// Include the react-router module
// Include the Route component
// Include the IndexRoute (catch-all route)
// Include the Router component
// Include the browserHistory prop to configure client side routing
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory
import { Route, IndexRoute, Router, browserHistory } from "react-router";

// Reference the high-level components
import Main from "../Pages/Main";
import Login from "../Pages/Login";
import Settings from "../Pages/Settings";
import DashboardWrapper from "../Pages/DashboardWrapper";
import Commands from "../components/Commands";

// Export the Routes
export default (
  // High level component is the Router component.
  <Router history={browserHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Dashboard or Settings show the appropriate component */}
      <Route path="Dashboard" component={DashboardWrapper}></Route>
      <Route path="Settings" component={Settings} />
      <Route path="Login" component={Login} />

      {/* If user selects any other path... we get the Home Dashboard Route */}
      <IndexRoute component={Main} />

    </Route>
  </Router>
);
