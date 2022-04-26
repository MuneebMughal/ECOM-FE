import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/admin/dashboard/Dashboard";
import Login from "./Pages/login/Login";
import PrivateRoutes from "./HOC/PrivateRoutes";
import { useUser } from "./customhooks/useUser";
import Loader from "./components/loader/Loader";
import Products from "./Pages/admin/product/Products";
import Analytics from "./components/analytics/Analytics";
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
        <PrivateRoutes exact path="/products" component={Products} />
        <PrivateRoutes exact path="/analytics" component={Analytics} />
      </Switch>
    </Router>
  );
};

export default App1;
