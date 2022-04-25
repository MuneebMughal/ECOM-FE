import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/admin/dashboard/Dashboard";
import Login from "./Pages/login/Login";
import PrivateRoutes from "./HOC/PrivateRoutes";
import { useUser } from "./customhooks/useUser";
import Loader from "./components/loader/Loader";
const App1 = () => {
  const [loading, setLoading] = useState(false);
  useUser(setLoading);
  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoutes exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App1;
