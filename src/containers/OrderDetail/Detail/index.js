// @vendors
import React from "react";
import { Table, Icon, Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
// @queries
import { GET_ORDER_BY_ID } from "../../../utilities/queries";
// @constants
import { DOLAR_COST } from "../../../utilities/constants";

const OrderTable = ({ order }) => {
  return (
    <Table compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Detail</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {order.detail.map((detail, index) => (
          <Table.Row key={detail.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{detail.product.description}</Table.Cell>
            <Table.Cell>{detail.productSize.description}</Table.Cell>
            <Table.Cell>{detail.quantity}</Table.Cell>
            <Table.Cell>
              <Icon name="euro sign" /> {detail.productSize.price}
            </Table.Cell>
            <Table.Cell>
              {detail.productSize.price * detail.quantity}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const OrderDetail = ({ orderId }) => {
  const { loading, data } = useQuery(GET_ORDER_BY_ID, {
    variables: {
      id: orderId,
    },
  });

  if (loading) return <Loader active />;

  const { getOrderById: order } = data;

  return (
    <div>
      <OrderTable order={order} />
      <Table collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Sub Total:</Table.Cell>
            <Table.Cell>EUR {order.total - order.deliveryCost}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Delivery Cost:</Table.Cell>
            <Table.Cell>EUR {order.deliveryCost}</Table.Cell>
          </Table.Row>
          <Table.Row positive>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>EUR {order.total}</Table.Cell>
          </Table.Row>
          <Table.Row positive>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>USD {(order.total * DOLAR_COST).toFixed(2)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderDetail;
