import gql from "graphql-tag";

export const PRODUCT_SIZE_FRAGMENT = gql`
  fragment productSizeFragment on ProductSize {
    id
    productId
    sizeId
    price
    description
  }
`;
