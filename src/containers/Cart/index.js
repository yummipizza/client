// @vendors
import React from "react";
import { Divider } from "semantic-ui-react";
// @styles
import { Wrapper } from "./styles";
// @components
import CartDetail from "./Detail";

const Cart = () => {
  return (
    <Wrapper>
      <h3>My Order</h3>
      <Divider />
      <CartDetail />
    </Wrapper>
  );
};

export default Cart;
