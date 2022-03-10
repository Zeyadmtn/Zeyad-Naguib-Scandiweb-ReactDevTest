export default function cartReducer(state = { cartItems: [] }, action) {
  let newSelectedProduct = null;
  switch (action.type) {
    case "ADD_TO_CART":

      // Check if product already exists in cart:
      const checkForExistingItem = state.cartItems.some((item) => {
        return item.id === action.payload.id
      })

      if (!checkForExistingItem){
        state.cartItems.push(action.payload);
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case "INCREMENT_ITEM":
      newSelectedProduct = action.payload;
      newSelectedProduct.qtyy += 1;

      return {
        ...state,
        selectedProduct: newSelectedProduct,
      };

    case "DECREMENT_ITEM":
      newSelectedProduct = action.payload;

      if (newSelectedProduct.qtyy === 1) {
        const newCartItems = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          cartItems: newCartItems,
        };
      } else {
        newSelectedProduct.qtyy -= 1;
        return {
          ...state,
          selectedProduct: newSelectedProduct,
        };
      }

    default:
      return state;
  }
}
