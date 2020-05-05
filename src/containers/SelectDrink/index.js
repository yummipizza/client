// @vendors
import React from "react";
import { Divider, Button, Loader, Card, Image, Icon } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
// @queries
import { GET_PRODUCTS_BY_TYPE } from "../../utilities/queries";
// @styles
import { Wrapper } from "./styles";
// @utilities
import { useCart } from "../../utilities/hooks/useCart";

const SelectDrink = () => {
  const history = useHistory();
  const { addCartItem } = useCart();

  const { loading, data } = useQuery(GET_PRODUCTS_BY_TYPE, {
    variables: { typeId: 10 },
  });

  if (loading) return <Loader active />;

  const selectDrink = (drink) => {
    const selectedSize = drink.sizes[0];

    addCartItem({
      productId: drink.id,
      productName: drink.name,
      sizeId: selectedSize.id,
      sizeDescription: selectedSize.size.description,
      quantity: 1,
      price: selectedSize.price,
    });

    history.push("/my-cart");
  };

  return (
    <Wrapper>
      <h3>Select your drink</h3>
      <Divider />
      <Card.Group>
        {data.getProductsByType.map((drink) => (
          <Card key={drink.id}>
            <Card.Content textAlign="center">
              <Card.Header>{drink.name}</Card.Header>
              <Image src={drink.image} />
            </Card.Content>
            <Card.Content extra textAlign="center">
              <div className="ui two buttons">
                <Button color="secondary" onClick={() => selectDrink(drink)}>
                  <Icon name="plus" /> Select
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Wrapper>
  );
};

export default SelectDrink;
