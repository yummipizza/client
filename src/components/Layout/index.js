// @vendors
import React from "react";
import { Container, Icon, Menu, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// @styles
import { Logo, StyledContainer } from "./styles";
// @utilities
import { useCart } from "../../utilities/hooks/useCart";

const Layout = ({ children }) => {
  const history = useHistory();
  const { cart } = useCart();

  let totalItems;

  if (cart && cart.items.length > 0) {
    totalItems = cart.items.length;
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
          <Menu.Item name="logout" onClick={() => history.push("/my-cart")}>
            <Icon name="shopping cart" /> My Cart{" "}
            {totalItems && <Label color="teal">{totalItems}</Label>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container>{children}</Container>
      <p
        style={{ textAlign: "center", marginTop: "100px", fontWeight: "bold" }}
      >
        All rights reserved <Icon name="copyright" /> {new Date().getFullYear()}{" "}
        Yummi Pizza
      </p>
    </StyledContainer>
  );
};

export default Layout;
