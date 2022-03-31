import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { roles } from "../../actions/constants";
const UserPrivateRoutes = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.isLoggedIn && user.role === roles.SUBSCRIBER ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default UserPrivateRoutes;
