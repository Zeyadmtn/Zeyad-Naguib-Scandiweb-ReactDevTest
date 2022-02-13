import { client } from "../graphql/client";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORY_NAMES,
  GET_CURRENCIES,
} from "../graphql/queries.js";

export const fetchAllProducts = () => {
  return (dispatch) => {
    client.query({ query: GET_ALL_PRODUCTS }).then((result) => {
      dispatch(productsFetchedAction(result.data));
    });
  };
};

export const fetchCategoryNames = () => {
  return (dispatch) => {
    client.query({ query: GET_CATEGORY_NAMES }).then((result) => {
      dispatch(fetchCateogriesAction(result.data.categories));
    });
  };
};

export const fetchCurrencies = () => {
  return (dispatch) => {
    client.query({ query: GET_CURRENCIES }).then((result) => {
      dispatch(fetchCurrenciesAction(result.data.currencies));
    });
  };
};

export const productsFetchedAction = (productsData) => ({
  type: "PRODUCTS_FETCHED",
  payload: productsData,
});

export const fetchCateogriesAction = (categoryNames) => ({
  type: "FETCH_CATEGORY_NAMES",
  payload: categoryNames,
});

export const fetchCurrenciesAction = (currencies) => ({
  type: "FETCH_CURRENCY",
  payload: currencies,
});
