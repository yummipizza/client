// @vendors
import React from "react";
import { Switch, Route } from "react-router-dom";
// @components
import { Layout } from "../components";
import Home from "./Home";
import SelectPizza from "./SelectPizza";
import SelectDrink from "./SelectDrink";
import Cart from "./Cart";
// @utilities
import { ProvideCart } from "../utilities/hooks/useCart";

const App = () => {
  return (
    <ProvideCart>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/select-pizza/:pizzaId" component={SelectPizza} />
          <Route path="/select-drink" component={SelectDrink} />
          <Route path="/my-cart" component={Cart} />
        </Switch>
      </Layout>
    </ProvideCart>
  );
};

export default App;
