import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
const UserPrivateRoutes = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest}>{children}</Route>
  );
};

export default UserPrivateRoutes;
