import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Login from "./Pages/login/Login";
import PrivateRoutes from "./HOC/PrivateRoutes";
import { useUser } from "./customhooks/useUser";
import Loader from "./components/loader/Loader";
import Products from "./Pages/admin/product/Products";
import Analytics from "./Pages/analytics/Analytics";
import Reports from "./Pages/reports/Reports";
import Users from "./Pages/users/Users";
import Categories from "./Pages/categories/Categories";
import Sales from "./Pages/sales/Sales";
import Orders from "./Pages/orders/Orders";
import Delivery from "./Pages/delivery/Delivery";
import Coupons from "./Pages/coupons/Coupons";
import Offers from "./Pages/offers/Offers";
import ReportError from "./Pages/report error/ReportError";
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
        <PrivateRoutes exact path="/reports" component={Reports} />
        <PrivateRoutes exact path="/users" component={Users} />
        <PrivateRoutes exact path="/categories" component={Categories} />
        <PrivateRoutes exact path="/sales" component={Sales} />
        <PrivateRoutes exact path="/orders" component={Orders} />
        <PrivateRoutes exact path="/delivery" component={Delivery} />
        <PrivateRoutes exact path="/coupons" component={Coupons} />
        <PrivateRoutes exact path="/offers" component={Offers} />
        <PrivateRoutes exact path="/report-error" component={ReportError} />
      </Switch>
    </Router>
  );
};

export default App1;
