const changeAttributeAction = (atr, prod) => ({
  type: "CHANGE_ATTRIBUTE",
  payload: { attribute: atr, product: prod },
});

export default changeAttributeAction;
