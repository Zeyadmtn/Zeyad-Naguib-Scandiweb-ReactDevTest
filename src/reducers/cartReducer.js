export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "INCREMENT_ITEM":
      let incrementedProduct = state.cartItems.filter(
        (item) => item.cartID === action.payload.cartID
      );

      incrementedProduct = incrementedProduct[0];
      incrementedProduct.qtyy += 1;

      state.cartItems.map((item) => {
        if (item.cartID === incrementedProduct.cartID) {
          return (item = incrementedProduct);
        }
        return item;
      });

      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case "DECREMENT_ITEM":
      let decrementedProduct = state.cartItems.filter(
        (item) => item.cartID === action.payload.cartID
      );

      decrementedProduct = decrementedProduct[0];

      if (decrementedProduct.qtyy === 1) {
        let newCartItems = state.cartItems.filter(
          (item) => item.cartID !== action.payload.cartID
        );

        return {
          ...state,
          cartItems: newCartItems,
        };
      } else {
        decrementedProduct.qtyy -= 1;

        state.cartItems.map((item) => {
          if (item.cartID === decrementedProduct.cartID) {
            return (item = decrementedProduct);
          }
          return item;
        });

        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }

    default:
      return state;
  }
}
