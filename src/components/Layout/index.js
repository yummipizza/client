// @vendors
import React from "react";
import { Container, Icon, Menu } from "semantic-ui-react";
// @styles
import { Logo, StyledContainer } from "./styles";

const Layout = ({ children }) => (
  <StyledContainer>
    <Menu secondary stackable>
      <Menu.Menu onClick={() => alert(1)}>
        <Logo children="Yummy Pizza" />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item name="orders" onClick={() => {}} />
        <Menu.Item name="logout" onClick={() => {}}>
          <Icon name="shopping cart" /> Cart
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Container>{children}</Container>
  </StyledContainer>
);

export default Layout;
