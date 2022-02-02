const productsFetchedAction = (selectedProduct) => ({
    type: "SELECT_PRODUCT",
    payload: selectedProduct
});

export default productsFetchedAction;