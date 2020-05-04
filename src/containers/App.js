// @vendors
import React from "react";
import { Switch, Route } from "react-router-dom";
// @components
import { Layout } from "../components";
import Home from "./Home";
import SelectPizza from "./SelectPizza";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/select-pizza/:pizzaId" component={SelectPizza} />
      </Switch>
    </Layout>
  );
};

export default App;
