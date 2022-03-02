const changeAttributeAction = (atr, item, prod) => ({
  type: "CHANGE_ATTRIBUTE",
  payload: { attribute: atr, item, product: prod },
});

export default changeAttributeAction;
