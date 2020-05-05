// @vendors
import React from "react";
import { Divider } from "semantic-ui-react";
// @styles
import { Wrapper } from "./styles";
// @components
import OrderDetail from "./Detail";

const OrdersHistory = () => {
  return (
    <Wrapper>
      <h3>Orders history</h3>
      <Divider />
      <OrderDetail />
    </Wrapper>
  );
};

export default OrdersHistory;
