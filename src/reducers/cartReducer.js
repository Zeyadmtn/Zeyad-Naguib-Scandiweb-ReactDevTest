export default function cartReducer(state = { cartItems: [] }, action) {
  let newSelectedProduct = null;
  switch (action.type) {
    case "ADD_TO_CART":
      const tempCart = state.cartItems;
      tempCart.push(action.payload);
      return {
        ...state,
        cartItems: tempCart,
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
        console.log(newCartItems);
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