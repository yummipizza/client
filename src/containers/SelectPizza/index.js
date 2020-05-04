// @vendors
import React from "react";
import { Loader, Grid, Image, Header, Segment } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../../utilities/queries";
// @styles
import { Wrapper } from "./styles";
// @components
import SelectPizzaForm from "./Form";

const SelectPizza = () => {
  const { pizzaId } = useParams();
  const { loading, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: pizzaId },
  });

  if (loading) return <Loader active />;

  const { getProductById: pizza } = data;

  return (
    <Wrapper>
      <Segment color="black">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <Image size="medium" src={pizza.image} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid.Row>
                <Header as="h2" textAlign="center">
                  {pizza.name}
                </Header>
              </Grid.Row>
              <Grid.Row>
                <SelectPizzaForm pizza={pizza} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Wrapper>
  );
};

export default SelectPizza;
