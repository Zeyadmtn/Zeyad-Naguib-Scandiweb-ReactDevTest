
export default function fetchReducer(state = {allProducts: [], 
                                              categoryNames: [],
                                              availableCurrencies: [],
                                              activeCurrency: "",
                                              activeCurrencySymbol: "",
                                             }, action) 
{
    
    switch (action.type) {
        case "PRODUCTS_FETCHED":
            const tempAllProducts = JSON.parse(JSON.stringify(action.payload.category.products));
            tempAllProducts.map((product) => 
                 {
                     return product.qtyy = 0
                })
            return { 
                    ...state, 
                    allProducts: tempAllProducts, 
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