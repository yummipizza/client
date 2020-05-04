// @vendors
import React from "react";
import { Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
// @queries
import { GET_AUXILIARY_FIELDS } from "../../utilities/queries";
// @components
import PizzaGroup from "./Menu/PizzaGroup";
// @styles
import { HomeWrapper } from "./styles";

const Home = () => {
  const { loading, data } = useQuery(GET_AUXILIARY_FIELDS, {
    variables: { fieldType: "PIZZA_TYPES" },
  });

  if (loading) return <Loader active />;

  return (
    <HomeWrapper>
      {data.getAuxiliaryFieldByFieldTypes.map((item) => (
        <PizzaGroup key={item.id} pizzaType={item} />
      ))}
    </HomeWrapper>
  );
};

export default Home;
