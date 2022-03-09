export default function changeAtrReducer(state = 0, action) {
  switch (action.type) {
    case "CHANGE_ATTRIBUTE":
      let newSelectedProd = action.payload.product;

      newSelectedProd.attributes.map((attribute) => {
        if (attribute === action.payload.attribute) {
          attribute.items.map((item) => {
            return (item.selected = false);
          });
          
        }

        attribute.items
          .filter((item) => {
            return item === action.payload.item;
          })
          .map((el) => {
            return (el.selected = true);
          });

          return attribute;
      });

      return {
        ...state,
        selectedProduct: newSelectedProd,
      };

    default:
      return state;
  }
}
