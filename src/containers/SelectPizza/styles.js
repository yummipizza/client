import styled from "styled-components";
import { Statistic } from "semantic-ui-react";

export const Wrapper = styled.div`
  margin-top: 100px;
`;

export const PriceContainer = styled(Statistic)`
  &.ui.statistic {
    margin: 3em 0;
  }
`;

export const MoneySymbol = styled.span`
  font-size: 1.2rem;
`;
