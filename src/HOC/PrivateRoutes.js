import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.isLoggedIn ? (
    rest.path === '/password' ? <Route {...rest}>{children}</Route> :
    <Redirect to="/" />
  ) : (
    <Route {...rest}>{children}</Route>
  );
};

export default PrivateRoutes;
