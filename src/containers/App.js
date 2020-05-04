// @vendors
import React from "react";
import { Switch, Route } from "react-router-dom";
// @components
import { Layout } from "../components";
import Home from "./Home";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact paht="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default App;
