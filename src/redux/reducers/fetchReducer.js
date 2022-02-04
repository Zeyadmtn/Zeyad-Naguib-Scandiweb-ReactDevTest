
export default function fetchReducer(state = {allProducts: []}, action) {
    switch (action.type) {
        case "PRODUCTS_FETCHED":
            return { 
                    ...state, 
                    allProducts: action.payload.category.products, 
                    selectedProduct: {},
                    productsInCart: [],
                    activeCategory: "" 
                };
        default:
            return state;
    }
}