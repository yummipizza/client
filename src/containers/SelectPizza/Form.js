// @vendors
import React from "react";
import { Form, Statistic, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
// @styles
import { PriceContainer, MoneySymbol } from "./styles";
// @constants
import { DELIVERY_COST, DOLAR_COST } from "../../utilities/constants";
// @utilities
import { useCart } from "../../utilities/hooks/useCart";

let validationSchema = yup.object().shape({
  selectedPizzaSize: yup.number().required(),
  quantity: yup.number().min(1).required(),
});

const SelectPizzaForm = ({ pizza }) => {
  const history = useHistory();
  const { cart, addCartItem, startOrder } = useCart();

  const formik = useFormik({
    initialValues: {
      selectedPizzaSize: pizza.sizes[0].id,
      quantity: 1,
    },
    validationSchema,
    onSubmit(values) {
      const cartItem = {
        productId: pizza.id,
        productName: pizza.name,
        sizeId: values.selectedPizzaSize,
        sizeDescription: `${selectedSize.size.description} - ${selectedSize.description}`,
        quantity: values.quantity,
        price: selectedSize.price,
      };

      if (cart) {
        addCartItem(cartItem);
      } else {
        startOrder(
          {
            deliveryCost: DELIVERY_COST,
          },
          cartItem
        );
      }

      history.push("/select-drink");
    },
  });

  const pizzaSizes = pizza.sizes.map((item) => ({
    value: item.id,
    text: item.size.description,
    label: item.description,
  }));

  const selectedSize = pizza.sizes.find(
    (size) => size.id === formik.values.selectedPizzaSize
  );

  const priceEUR = selectedSize.price * formik.values.quantity;
  const priceUSD = priceEUR * DOLAR_COST;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Select size"
          options={pizzaSizes}
          placeholder="Pizza Size"
          value={formik.values.selectedPizzaSize}
          width="6"
          name="selectedPizzaSize"
          onChange={(e, { value }) =>
            formik.setFieldValue("selectedPizzaSize", value)
          }
          error={formik.errors.selectedPizzaSize}
        />
        <Form.Input
          fluid
          label="Quantity"
          placeholder="Quantity"
          type="number"
          min="1"
          width="3"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.errors.quantity}
        />
      </Form.Group>
      <PriceContainer size="tiny">
        <Statistic.Value>
          <MoneySymbol>EUR</MoneySymbol> {priceEUR} -{" "}
          <MoneySymbol>USD</MoneySymbol> {priceUSD.toFixed(2)}
        </Statistic.Value>
        <Statistic.Label>{selectedSize.description}</Statistic.Label>
      </PriceContainer>
      <Form.Button type="submit" secondary>
        Continue <Icon name="arrow circle right" />
      </Form.Button>
    </Form>
  );
};

export default SelectPizzaForm;
