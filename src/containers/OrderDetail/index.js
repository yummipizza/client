// @vendors
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Divider, Icon } from "semantic-ui-react";
// @styles
import { Wrapper } from "./styles";
// @components
import Detail from "./Detail";

const OrderDetail = () => {
  const { orderId } = useParams();
  const history = useHistory();

  return (
    <Wrapper>
      <h3>
        <Icon
          name="arrow alternate circle left"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/orders-history")}
        />
        Order Detail
      </h3>
      <Divider />
      <Detail orderId={orderId} />
    </Wrapper>
  );
};

export default OrderDetail;
