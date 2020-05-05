import React, { useContext, createContext, useState } from "react";
import calculateTotal from "../calculateTotal";

const Context = createContext();

export const ProvideCart = ({ children }) => {
  const provideCart = useProvideCart();
  return <Context.Provider value={provideCart}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};

function useProvideCart() {
  const [cart, setCart] = useState(null);

  function addCartItem(cartItemToAdd) {
    try {
      const cartItems = [...cart.items];

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

      setCart({ ...cart, total, items: cartItems });

      return true;
    } catch (err) {
      return false;
    }
  }

  function startOrder(cartToAdd, cartItemToAdd) {
    try {
      setCart({
        ...cartToAdd,
        total: cartItemToAdd.quantity * cartItemToAdd.price,
        items: [cartItemToAdd],
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  function deleteOrder() {
    setCart(null);
  }

  function removeProductFromCart(productToRemove) {
    const cartItems = [...cart.items];

    const newCartItems = cartItems.filter(
      (item) =>
        item.productId !== productToRemove.productId &&
        item.sizeId !== productToRemove.sizeId
    );

    if (newCartItems.length === 0) {
      return deleteOrder();
    }

    const total = calculateTotal(newCartItems);

    setCart({
      ...cart,
      total,
      items: newCartItems,
    });
  }

  return {
    cart,
    addCartItem,
    startOrder,
    deleteOrder,
    removeProductFromCart,
  };
}
