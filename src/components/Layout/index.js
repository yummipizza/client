// @vendors
import React from "react";
import { Container, Icon, Menu, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
// @styles
import { Logo, StyledContainer } from "./styles";
// @queries
import { GET_CART } from "../../utilities/queries";

const Layout = ({ children }) => {
  const history = useHistory();
  const { data } = useQuery(GET_CART);

  let totalItems;

  if (data && data.Cart && data.Cart.items) {
    totalItems = data.Cart.items.length;
  }

  return (
    <StyledContainer>
      <Menu secondary stackable>
        <Menu.Menu onClick={() => history.push("/")}>
          <Logo children="Yummy Pizza" />
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item
            name="orders"
            onClick={() => history.push("/orders-history")}
          />
          <Menu.Item name="logout" onClick={() => history.push("/cart")}>
            <Icon name="shopping cart" /> My Cart{" "}
            {totalItems && <Label color="teal">{totalItems}</Label>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container>{children}</Container>
    </StyledContainer>
  );
};

export default Layout;
