import gql from "graphql-tag";

export const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      id
      total
      deliveryCost
      completed
      comments
      paidAt
      detail {
        id
        quantity
        product {
          description
        }
      }
    }
  }
`;
