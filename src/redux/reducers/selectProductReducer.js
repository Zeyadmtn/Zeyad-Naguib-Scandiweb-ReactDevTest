
export default function selectProductReducer(state = {selectedProduct: {}}, action) {
    switch (action.type) {
        case "SELECT_PRODUCT":
            return {
                ...state,
                selectedProduct: action.payload
             };
        default:
            return state;
    }
}