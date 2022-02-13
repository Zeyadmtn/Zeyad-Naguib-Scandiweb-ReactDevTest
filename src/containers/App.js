import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import activeCategoryAction from "../actions/activateCategoryAction";
import activeCurrencyAction from "../actions/activeCurrencyAction";
import { addToCartAction } from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import {
  fetchAllProducts,
  fetchCategoryNames,
  fetchCurrencies,
} from "../actions/fetchAction";
import updateSelectedProductAction from "../actions/selectProductAction";
import Cart from "./Cart";
import CategoryProductsPage from "./CategoryPage";
import NavBar from "./NavBar";
import ProductPage from "./ProductPage";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
    this.props.fetchCategories();
    this.props.fetchAllCurrencies();
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/product-page" element={<ProductPage />} />

          <Route path="/" element={<CategoryProductsPage />} />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={this.props.cartItems}
                currencySymbol={this.props.activeCurrencySymbol}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCategory: state.activeCategoryReducer.activeCategory,
    categoryNames: state.fetchReducer.categoryNames,
    availableCurrencies: state.fetchReducer.availableCurrencies,
    activeCurrency: state.activeCurrencyReducer.activeCurrency,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
    cartItems: state.cartReducer.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchAllProducts());
    },

    fetchCategories: () => {
      dispatch(fetchCategoryNames());
    },

    updateSelectedProduct: (selectedProduct) => {
      dispatch(updateSelectedProductAction(selectedProduct));
    },

    updateActiveCategory: (activeCategory) => {
      dispatch(activeCategoryAction(activeCategory));
    },

    fetchAllCurrencies: () => {
      dispatch(fetchCurrencies());
    },

    updateActiveCurrency: (currency) => {
      dispatch(activeCurrencyAction(currency));
    },

    addToCart: (item) => {
      dispatch(addToCartAction(item));
    },

    changeAtr: (attribute, product) => {
      dispatch(changeAttributeAction(attribute, product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// <Route path='/' element={<CategoryProductsPage dataFetched={this.props}
//             updateSelectedProduct={this.props.updateSelectedProduct}
//             activeCategory={this.props.activeCategory}
//             updateActiveCategory={this.props.updateActiveCategory}
//             currencySymbol={this.props.activeCurrencySymbol} />} />
