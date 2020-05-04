import gql from "graphql-tag";

export const AUXILIARY_FIELD_FRAGMENT = gql`
  fragment auxiliaryFieldFragment on AuxiliaryField {
    id
    description
    fieldId
    fieldDescription
  }
`;

export const GET_AUXILIARY_FIELDS = gql`
  query getAuxiliaryFields($fieldType: FieldTypes!) {
    getAuxiliaryFieldByFieldTypes(fieldType: $fieldType) {
      ...auxiliaryFieldFragment
    }
  }
  ${AUXILIARY_FIELD_FRAGMENT}
`;
