import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
const App1 = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App1;
