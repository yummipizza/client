// @vendors
import React from "react";
import { Container, Loader, Segment, Card } from "semantic-ui-react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
// @queries
import { GET_AUXILIARY_FIELDS } from "../../utilities/queries";

const PizzaSection = ({ pizzaType }) => {
  return (
    <Segment>
      <h4>{pizzaType.description}</h4>
    </Segment>
  );
};

const Home = () => {
  const { loading, data } = useQuery(GET_AUXILIARY_FIELDS, {
    variables: { fieldType: "PIZZA_TYPES" },
  });

  if (loading) return <Loader active />;

  return (
    <div>
      {data.getAuxiliaryFieldByFieldTypes.map((item) => (
        <PizzaSection key={item.id} pizzaType={item} />
      ))}
    </div>
  );
};

export default Home;
