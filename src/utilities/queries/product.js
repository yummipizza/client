import gql from "graphql-tag";

export const GET_PRODUCTS_BY_TYPE = gql`
  query getProductsByType($typeId: ID!) {
    getProductsByType(typeId: $typeId) {
      id
      name
      image
    }
  }
`;
