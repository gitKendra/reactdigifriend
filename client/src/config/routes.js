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
import Main from "../components/Main";
import Commands from "../components/Commands";
import Settings from "../components/Settings";
import Dashboard from "../components/Dashboard";

// Export the Routes
export default (
  // High level component is the Router component.
  <Router history={browserHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Commands or Settings show the appropriate component */}
      <Route path="Dashboard" component={Dashboard} />
      <Route path="Commands" component={Commands} />
      <Route path="Settings" component={Settings} />

      {/* If user selects any other path... we get the Home Dashboard Route */}
      <IndexRoute component={Dashboard} />

    </Route>
  </Router>
);
