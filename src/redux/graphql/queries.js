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

export const GET_PRODUCT_BY_ID = gql`
  query Query($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      items {
        displayValue
        value
        id
      }
      type
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
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Query($input: CategoryInput) {
  category(input: $input) {
    name
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

export const GET_CATEGORY_NAMES = gql`
  query Category {
  categories {
    name
  }
}
`;


