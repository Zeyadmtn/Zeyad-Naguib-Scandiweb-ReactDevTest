import { FETCH_DATA } from '../actions/fetchAction';

export default function fetchReducer(state = {allProducts: []}, action) {
    switch (action.type) {
        case "PRODUCTS_FETCHED":
            console.log("PRODUCTS_FETCHED");
            console.log(action.payload.category.products)
            return { ...state, allProducts: action.payload.category.products };
        default:
            return state;
    }
}