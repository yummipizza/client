// @vendors
import React from "react";
import { Divider, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
// @styles
import { Wrapper, FormWrapper } from "./styles";
// @utilities
import { useCart } from "../../utilities/hooks/useCart";
// @queries
import { CREATE_ORDER, GET_ORDERS_BY_EMAIL } from "../../utilities/queries";

let validationSchema = yup.object().shape({
  fullName: yup.string().trim().required(),
  deliveryAddress: yup.string().trim().required(),
  mobile: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
});

const Client = () => {
  const { cart, deleteOrder } = useCart();
  const history = useHistory();
  const [placeOrder, { loading: saving }] = useMutation(CREATE_ORDER);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      deliveryAddress: "",
      mobile: "",
      email: "",
    },
    validationSchema,
    async onSubmit(clientInfo) {
      await placeOrder({
        variables: {
          order: {
            deliveryCost: cart.deliveryCost,
            completed: true,
            client: clientInfo,
            detail: cart.items.map((cartItem) => ({
              product: cartItem.productId,
              size: cartItem.sizeId,
              quantity: cartItem.quantity,
              price: cartItem.price,
            })),
          },
        },
        update: (cache, { data: { createOrder } }) => {
          const queryConfig = {
            query: GET_ORDERS_BY_EMAIL,
            variables: { email: clientInfo.email },
          };

          const data = cache.readQuery(queryConfig);

          data.getOrdersByClientEmail.push(createOrder);

          cache.writeQuery(queryConfig, { data });
        },
      });

      deleteOrder();
      localStorage.setItem("client", JSON.stringify(clientInfo));
      history.push("/orders-history");
    },
  });

  if (!cart) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <h3>Enter your contact information</h3>
      <Divider />
      <FormWrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            label="Full Name"
            placeholder="e.g. David Watson"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.errors.fullName}
          />
          <Form.Input
            label="Delivery Address"
            placeholder="e.g. Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick"
            name="deliveryAddress"
            value={formik.values.deliveryAddress}
            onChange={formik.handleChange}
            error={formik.errors.deliveryAddress}
          />
          <Form.Input
            label="Mobile"
            placeholder="e.g. 12345678"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.errors.mobile}
          />
          <Form.Input
            label="Email"
            placeholder="e.g. example@domain.com"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Form.Button
            icon="cart"
            labelPosition="left"
            positive
            content="Place Order"
            type="submit"
            disabled={saving}
          />
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Client;
