// @vendors
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Table, Button, Icon } from "semantic-ui-react";
// @queries
import { GET_CART } from "../../../utilities/queries";

const CartDetail = () => {
  const { data } = useQuery(GET_CART);

  if (!data) {
    return <p>Your cart is empty</p>;
  }

  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Detail</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.Cart.items.map((item) => (
          <Table.Row>
            <Table.Cell>{item.productName}</Table.Cell>
            <Table.Cell>{item.sizeDescription}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell>{item.quantity * item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Button
              floated="right"
              icon
              labelPosition="left"
              positive
              size="small"
            >
              <Icon name="cart" /> Place Order
            </Button>
            <Button floated="right" negative size="small">
              Cancel Order
            </Button>
            <Button size="small">Add Drink</Button>
            <Button size="small">Add Pizza</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default CartDetail;
