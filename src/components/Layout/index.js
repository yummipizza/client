// @vendors
import React from "react";
import { Container, Icon, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// @styles
import { Logo, StyledContainer } from "./styles";

const Layout = ({ children }) => {
  const history = useHistory();

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
            <Icon name="shopping cart" /> My Cart
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container>{children}</Container>
    </StyledContainer>
  );
};

export default Layout;
