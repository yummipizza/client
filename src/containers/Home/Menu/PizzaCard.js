// @vendors
import React from "react";
import { Button, Loader, Card, Image, Icon } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
// @queries
import { GET_PRODUCTS_BY_TYPE } from "../../../utilities/queries";

const PizzaCard = ({ typeId }) => {
  const { loading, data } = useQuery(GET_PRODUCTS_BY_TYPE, {
    variables: { typeId },
  });

  if (loading) return <Loader active />;

  return (
    <Card.Group>
      {data.getProductsByType.map((pizza) => (
        <Card key={pizza.id}>
          <Card.Content textAlign="center">
            <Card.Header>{pizza.name}</Card.Header>
            <Image src={pizza.image} />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Button color="secondary">
              <Icon name="plus" /> Select
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default PizzaCard;
