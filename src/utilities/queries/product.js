import gql from "graphql-tag";

import { PRODUCT_SIZE_FRAGMENT } from "./productSize";
import { AUXILIARY_FIELD_FRAGMENT } from "./auxiliaryFields";

export const PRODUCT_FRAGMENT = gql`
  fragment productFragment on Product {
    id
    name
    image
    description
  }
`;

export const GET_PRODUCTS_BY_TYPE = gql`
  query getProductsByType($typeId: ID!) {
    getProductsByType(typeId: $typeId) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      ...productFragment
      sizes {
        ...productSizeFragment
        size {
          ...auxiliaryFieldFragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_SIZE_FRAGMENT}
  ${AUXILIARY_FIELD_FRAGMENT}
`;
