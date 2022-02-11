export default function changeAtrReducer(state = 0, action) {
    switch (action.type) {
        case "CHANGE_ATTRIBUTE":
            let newSelectedProd = action.payload.product;
            newSelectedProd.attributes.map((attribute) => {
                attribute.items.filter((item) => {return item === action.payload.attribute})
                .map((el) => {
                    return el.selected = true;
                })
            })
            return {
                ...state,
                selectedProduct: newSelectedProd
             }

        default:
            return state;
    }
}