export default (cartItems) => {
  let total = 0;

  cartItems.forEach((item) => {
    const subTotal = item.price * item.quantity;
    total += subTotal;
  });

  return total;
};
