
export default function fetchReducer(state = {
    allProducts: [],
    categoryNames: [],
    availableCurrencies: [],
    activeCurrency: "",
    activeCurrencySymbol: "",
}, action) {

    switch (action.type) {
        case "PRODUCTS_FETCHED":
            
            const productsWithQTY = JSON.parse(JSON.stringify(action.payload.category.products));
            productsWithQTY.map((product) => {
                return product.qtyy = 0
            })
            const productsWithSelAttr = JSON.parse(JSON.stringify(productsWithQTY));
            productsWithSelAttr.map((product) => {
                return product.selectedAttributes = []
            })

            return {
                ...state,
                allProducts: productsWithSelAttr,
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