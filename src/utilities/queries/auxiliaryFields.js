import gql from "graphql-tag";

export const GET_AUXILIARY_FIELDS = gql`
  query getAuxiliaryFields($fieldType: FieldTypes!) {
    getAuxiliaryFieldByFieldTypes(fieldType: $fieldType) {
      id
      description
      fieldId
      fieldDescription
    }
  }
`;
