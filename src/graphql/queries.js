import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query Query {
    category {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query Query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CATEGORY_NAMES = gql`
  query Category {
    categories {
      name
    }
  }
`;
