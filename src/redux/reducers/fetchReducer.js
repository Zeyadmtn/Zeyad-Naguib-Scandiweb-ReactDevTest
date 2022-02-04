
export default function fetchReducer(state = {allProducts: [], categoryNames: [] }, action) {
    switch (action.type) {
        case "PRODUCTS_FETCHED":
            return { 
                    ...state, 
                    allProducts: action.payload.category.products, 
                    selectedProduct: {},
                    productsInCart: [],
                    activeCategory: "",
                    categoryNames: [] 
                    
                };

        case "FETCH_CATEGORY_NAMES":
            return {
                ...state,
                categoryNames: action.payload
            };

        default:
            return state;
    }
}