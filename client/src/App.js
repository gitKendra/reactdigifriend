import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import DashboardWrapper from "./Pages/DashboardWrapper";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Settings from "./Pages/Settings";

const App = () =>
  <Router>
    <div>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashboardWrapper} />
        <Route path="/settings" component={Settings} />
    </div>
  </Router>;

export default App;
