// @vendors
import React from "react";
import { Switch, Route } from "react-router-dom";
// @components
import { Layout } from "../components";
import Home from "./Home";
import SelectPizza from "./SelectPizza";
import SelectDrink from "./SelectDrink";
import Cart from "./Cart";
import Client from "./Client";
import OrdersHistory from "./OrdersHistory";
import OrderDetail from "./OrderDetail";
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
          <Route path="/client-info" component={Client} />
          <Route path="/orders-history/:orderId" component={OrderDetail} />
          <Route path="/orders-history" component={OrdersHistory} />
        </Switch>
      </Layout>
    </ProvideCart>
  );
};

export default App;
