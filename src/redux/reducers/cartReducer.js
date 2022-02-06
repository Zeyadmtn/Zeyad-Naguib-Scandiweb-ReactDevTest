export default function cartReducer(state = { cartItems: [] }, action) {
    //const product = state.cartItems.find((product) => product.id === action.payload.id)
    switch (action.type) {
        case "ADD_TO_CART":
            const tempCart = state.cartItems;
            tempCart.push(action.payload);
                return {
                    ...state,
                    cartItems: tempCart
                
            }
        default:
            return state;
    }
}