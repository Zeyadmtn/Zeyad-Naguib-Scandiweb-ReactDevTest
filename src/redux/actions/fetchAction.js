import {client} from '../graphql/client';
import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY
} from '../graphql/queries.js';

export const fetchAllProducts = () => {
    return dispatch => {client.query({query: GET_ALL_PRODUCTS})
.then(result => {
    dispatch(productsFetchedAction(result.data))
})}
}

export const productsFetchedAction = (productsData) => ({
    type: "PRODUCTS_FETCHED",
    payload: productsData
});