// @vendors
import React from "react";
import { Divider } from "semantic-ui-react";
// @styles
import { GroupWrapper } from "./styles";
// @components
import PizzaCard from "./PizzaCard";

const PizzaGroup = ({ pizzaType }) => {
  return (
    <GroupWrapper>
      <h3>{pizzaType.description}</h3>
      <Divider />
      <PizzaCard typeId={pizzaType.id} />
    </GroupWrapper>
  );
};

export default PizzaGroup;
