import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import activeCategoryAction from "../actions/activateCategoryAction";
import { fetchAllProducts, fetchCategoryNames } from "../actions/fetchAction";
import updateSelectedProductAction from "../actions/selectProductAction";
import cart_icon from "../images/cart_icon.jpg";
import store_logo from "../images/store_logo.png";
import "../styles/navBarStyles.css";
import CurrencySelector from "./CurrencySelector";
import MinicartOverlay from "./MinicartOverlay.js";

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleCategoryButton = this.handleCategoryButton.bind(this);
    this.toggleMiniCartOverlay = this.toggleMiniCartOverlay.bind(this);

    this.state = { miniCartOverlay: false };
  }

  handleCategoryButton(category) {
    this.props.updateActiveCategory(category);
  }

  toggleMiniCartOverlay() {
    this.setState({ miniCartOverlay: !this.state.miniCartOverlay });
  }

  render() {
    return (
      <div className="navBar">
        {this.props.categoryNames.map((category) => (
          <Fade left cascade>
            <Link to="/" key={category.name}>
              <button
                className="navTypeSelectBtn"
                onClick={() => this.handleCategoryButton(category.name)}
              >
                {category.name}
              </button>
            </Link>
          </Fade>
        ))}

        <div className="store_logo">
          <img src={store_logo} alt="store_logo" />
        </div>

        <CurrencySelector />

        <div
          onClick={() => {
            this.toggleMiniCartOverlay();
          }}
        >
          <div className="bag-count">{this.props.cartItems.length}</div>
          <img src={cart_icon} alt="cart_icon" className="cart_icon" />
        </div>

        {this.state.miniCartOverlay ? <MinicartOverlay /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCategory: state.activeCategoryReducer.activeCategory,
    categoryNames: state.fetchReducer.categoryNames,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
