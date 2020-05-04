import gql from "graphql-tag";

export const typeDefs = gql`
  type Cart {
    total: Float!
    deliveryCost: Float!
    items: [CartItem]
  }

  type CartItem {
    productId: ID!
    productName: String!
    sizeId: ID!
    sizeDescription: String!
    quantity: Float!
  }
`;

export const resolvers = {
  Mutation: {
    startOrder(_, { cart, cartItem }, { cache }) {
      try {
        cache.writeData({
          data: {
            Cart: {
              ...cart,
              __typename: "Cart",
              items: [{ ...cartItem, __typename: "CartItem" }],
            },
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

export const GET_CART = gql`
  query getCart {
    Cart @client {
      total
      deliveryCost
      items @client {
        productId
        productName
        sizeId
        sizeDescription
        quantity
      }
    }
  }
`;

export const START_ORDER = gql`
  mutation startOrder($cart: CartInput!, $cartItem: CartItemInput!) {
    startOrder(cart: $cart, cartItem: $cartItem) @client
  }
`;
