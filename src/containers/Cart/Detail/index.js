// @vendors
import React, { useState } from "react";
import { Table, Button, Icon, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// @utilities
import { useCart } from "../../../utilities/hooks/useCart";
// @constants
import { DOLAR_COST } from "../../../utilities/constants";

const CartDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { cart, deleteOrder, removeProductFromCart } = useCart();

  const toggleModal = () => {
    setModalOpen((prevModalOpen) => !prevModalOpen);
  };

  const clearOrder = () => {
    deleteOrder();
    toggleModal();
  };

  if (!cart) {
    return <p>Your cart is empty</p>;
  }

  const totalEUR = cart.total + cart.deliveryCost;
  const totalUSD = totalEUR * DOLAR_COST;

  return (
    <div>
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cart.items.map((item) => (
            <Table.Row key={item.productId}>
              <Table.Cell>{item.productName}</Table.Cell>
              <Table.Cell>{item.sizeDescription}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity * item.price}</Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  color="red"
                  onClick={() => removeProductFromCart(item)}
                >
                  <Icon name="remove" /> Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Table.Cell>
                <Table collapsing>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Sub Total:</Table.Cell>
                      <Table.Cell>EUR {cart.total}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Delivery Cost:</Table.Cell>
                      <Table.Cell>EUR {cart.deliveryCost}</Table.Cell>
                    </Table.Row>
                    <Table.Row positive>
                      <Table.Cell>Total:</Table.Cell>
                      <Table.Cell>EUR {totalEUR}</Table.Cell>
                    </Table.Row>
                    <Table.Row positive>
                      <Table.Cell>Total:</Table.Cell>
                      <Table.Cell>USD {totalUSD.toFixed(2)}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Button
                floated="right"
                icon
                labelPosition="left"
                positive
                size="small"
              >
                <Icon name="cart" /> Place Order
              </Button>
              <Button
                floated="right"
                negative
                size="small"
                onClick={toggleModal}
              >
                Cancel Order
              </Button>
              <Button
                size="small"
                onClick={() => history.push("/select-drink")}
              >
                Add Drink
              </Button>
              <Button size="small" onClick={() => history.push("/")}>
                Add Pizza
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Modal open={modalOpen} onClose={toggleModal} size="mini">
        <Modal.Header content="Clear your order" />
        <Modal.Content>
          <p>Are you sure clear your order?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={toggleModal} content="No" />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={clearOrder}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CartDetail;
