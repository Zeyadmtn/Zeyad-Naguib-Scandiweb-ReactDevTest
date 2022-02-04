
export default function fetchReducer(state = {allProducts: [], 
                                              categoryNames: [],
                                              availableCurrencies: [],
                                              activeCurrency: "",
                                              activeCurrencySymbol: "",
                                             }, action) {
    switch (action.type) {
        case "PRODUCTS_FETCHED":
            return { 
                    ...state, 
                    allProducts: action.payload.category.products, 
                    selectedProduct: {},
                    productsInCart: [],
                    activeCategory: "",
                    activeCurrency: "",
                    activeCurrencySymbol: ""
                    
                    
                };

        case "FETCH_CATEGORY_NAMES":
            return {
                ...state,
                categoryNames: action.payload
            };

        case "FETCH_CURRENCY":
            return {
                ...state,
                availableCurrencies: action.payload
            }

        default:
            return state;
    }
}