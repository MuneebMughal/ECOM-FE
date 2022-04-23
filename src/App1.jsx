import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./Pages/login/Login";
const App1 = () => {
  return (
    <Router>
      <Login />
    </Router>
  );
};

export default App1;
