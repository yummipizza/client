// @vendors
import React from "react";
import { Button, Loader, Card, Image, Icon } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
// @queries
import { GET_PRODUCTS_BY_TYPE } from "../../../utilities/queries";

const PizzaCard = ({ typeId }) => {
  const history = useHistory();

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
            <div className="ui two buttons">
              <Button
                color="secondary"
                onClick={() => history.push(`/select-pizza/${pizza.id}`)}
              >
                <Icon name="plus" /> Select
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default PizzaCard;
