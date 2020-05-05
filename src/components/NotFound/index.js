// @vendors
import React from "react";
import { Segment, Icon } from "semantic-ui-react";
// @styles
import { Wrapper } from "./styles";

const NotFound = () => {
  return (
    <Wrapper>
      <Segment textAlign="center">
        <h2>Not found</h2>
        <Icon size="huge" name="ban" />
      </Segment>
    </Wrapper>
  );
};

export default NotFound;
