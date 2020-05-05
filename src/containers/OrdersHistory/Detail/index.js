// @vendors
import React from "react";
import { Table, Button, Icon, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
// @queries
import { GET_ORDER_BY_EMAIL } from "../../../utilities/queries";

const OrderTable = ({ clientInfo }) => {
  const history = useHistory();

  console.log(history);
  const client = JSON.parse(clientInfo);

  const { loading, data } = useQuery(GET_ORDER_BY_EMAIL, {
    variables: {
      email: client.email,
    },
  });

  if (loading) return <Loader active />;

  const { getOrdersByClientEmail: orders } = data;

  return (
    <Table compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order, index) => (
          <Table.Row key={order.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              {moment(order.paidAt).format("MM-DD-YYYY  HH:mm")}
            </Table.Cell>
            <Table.Cell>
              <Icon name="euro sign" /> {order.total}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                basic
                color="blue"
                onClick={() => history.push(`/orders-history/${order.id}`)}
              >
                View Detail <Icon name="arrow circle right" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const OrderDetail = () => {
  const clientInfo = localStorage.getItem("client");

  if (!clientInfo) {
    return <p>You don't have orders</p>;
  }

  return <OrderTable clientInfo={clientInfo} />;
};

export default OrderDetail;
