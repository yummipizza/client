import gql from "graphql-tag";
import calculateTotal from "../calculateTotal";

export const typeDefs = gql`
  type Cart {
    id: ID!
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
    price: Float!
  }
`;

export const resolvers = {
  Mutation: {
    startOrder(_, { cart, cartItem }, { cache }) {
      try {
        cache.writeData({
          data: {
            Cart: {
              id: 1,
              ...cart,
              total: cartItem.quantity * cartItem.price,
              __typename: "Cart",
              items: [{ ...cartItem, __typename: "CartItem" }],
            },
          },
        });

        return true;
      } catch (err) {
        return false;
      }
    },
    addCartItem(_, { cartItem: cartItemToAdd }, { cache }) {
      try {
        const { Cart } = cache.readQuery({
          query: GET_CART,
        });

        const cartItems = Cart.items;

        const cartItem = cartItems.find(
          (item) =>
            item.productId === cartItemToAdd.productId &&
            item.sizeId === cartItemToAdd.sizeId
        );

        if (cartItem) {
          cartItem.quantity += cartItemToAdd.quantity;
        } else {
          cartItems.push({ ...cartItemToAdd, __typename: "CartItem" });
        }

        const total = calculateTotal(cartItems);

        Cart.total = total;
        Cart.items = cartItems;

        cache.writeData({
          data: { Cart: { ...Cart } },
        });

        return true;
      } catch (err) {
        return false;
      }
    },
  },
};

export const GET_CART = gql`
  query getCart {
    Cart @client {
      id
      total
      deliveryCost
      __typename
      items @client {
        productId
        productName
        sizeId
        sizeDescription
        quantity
        price
        __typename
      }
    }
  }
`;

export const START_ORDER = gql`
  mutation startOrder($cart: CartInput!, $cartItem: CartItemInput!) {
    startOrder(cart: $cart, cartItem: $cartItem) @client
  }
`;

export const ADD_CART_ITEM = gql`
  mutation addCartItem($cartItem: CartItemInput!) {
    addCartItem(cartItem: $cartItem) @client
  }
`;
