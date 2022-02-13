export const addToCartAction = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const incrementProductAction = (product) => ({
  type: "INCREMENT_ITEM",
  payload: product,
});

export const decrementProductAction = (product) => ({
  type: "DECREMENT_ITEM",
  payload: product,
});
