import gql from "graphql-tag";

export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    total
    deliveryCost
    completed
    comments
    paidAt
  }
`;

export const ORDER_DETAIL_FRAGMENT = gql`
  fragment OrderDetailFragment on OrderDetail {
    id
    quantity
    product {
      description
    }
  }
  ${ORDER_FRAGMENT}
`;

export const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      ...OrderFragment
      detail {
        ...OrderDetailFragment
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
`;

export const GET_ORDER_BY_EMAIL = gql`
  query getOrdersByClientEmail($email: String!) {
    getOrdersByClientEmail(email: $email) {
      ...OrderFragment
      detail {
        ...OrderDetailFragment
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
`;
