import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  fetchAllProducts,
  fetchCategoryNames,
  fetchCurrencies,
} from "../actions/fetchAction";
import Cart from "./Cart";
import CategoryProductsPage from "./CategoryPage";
import NavBar from "./NavBar";
import ProductPage from "./ProductPage";

class App extends React.Component {
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchAllProducts());
    },

    fetchCategories: () => {
      dispatch(fetchCategoryNames());
    },

    fetchAllCurrencies: () => {
      dispatch(fetchCurrencies());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
