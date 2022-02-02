
export default function selectProductReducer(state = 0, action) {
    switch (action.type) {
        case "SELECT_PRODUCT":
            console.log("Current Selected product in SelectedProd Reducer is " + action.payload);
            console.log(action.payload);

            return {
                ...state,
                selectedProduct: action.payload
             };
        default:
            return state;
    }
}