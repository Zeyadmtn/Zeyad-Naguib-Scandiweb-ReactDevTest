import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCartAction,
  incrementProductAction,
} from "../actions/cartActions";
import updateSelectedProductAction from "../actions/selectProductAction";
import GetPrice from "../components/GetPrice";
import add_to_cart_circle from "../images/add_to_cart_circle.png";
import "../styles/categoryPageStyles.css";
import {Navigate} from 'react-router-dom';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToPDP = this.redirectToPDP.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.state = { toggleATCIcon: true };
    this.handleIconToggle = this.handleIconToggle.bind(this);
  }

  redirectToPDP(singleProduct) {
    this.props.updateSelectedProduct(singleProduct);
  }

  handleIconToggle(bool) {
    //this.setState({ toggleATCIcon: bool });
  }

  handleAddToCartClick(product) {
    if (product.attributes.length === 0) {
      if (product.qtyy <= 0) {
        this.props.addToCart(product);
      } else {
        this.props.incrementProduct(product);
      }
    } else {
      this.redirectToPDP(product);
      <Navigate  to="/product-page" />
    }
  }
  render() {
    const product = this.props.product;
    return (
      <div>
        {!product.inStock ? (
          <div
            onClick={() => this.redirectToPDP(product)}
            key={product.id}
            className="product-item-container"
          >
            <div className="productItem">
              <Link to="/product-page">
                <div className="productImage">
                  <div className="outOfStock">OUT OF STOCK</div>
                  <img
                    style={{ opacity: "0.3" }}
                    className="productImage"
                    src={product.gallery[0]}
                    alt="prod-img"
                  />
                </div>
                <div className="productName" style={{ color: "grey" }}>
                  {product.name}
                </div>
                <div className="productPrice">
                  <GetPrice
                    singleProduct={product}
                    currencySymbol={this.props.activeCurrencySymbol}
                  />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div
            onClick={() => this.redirectToPDP(product)}
            key={product.id}
            className="product-item-container"
            onMouseOver={() => this.handleIconToggle(true)}
            onMouseOut={() => this.handleIconToggle(false)}
          >
            {this.state.toggleATCIcon ? (
                <img
                  src={add_to_cart_circle}
                  alt="addToCartButton"
                  className="atc-icon"
                  onClick={() => this.handleAddToCartClick(product)}
                />
              ) : null}
            <Link to="/product-page">
              
              <div className="productItem">
                <div className="productImage">
                  <img
                    className="productImage"
                    src={product.gallery[0]}
                    alt="prod-img"
                  />
                </div>
                <div className="productName">{product.name}</div>
                <div className="productPrice">
                  <GetPrice
                    singleProduct={product}
                    currencySymbol={this.props.activeCurrencySymbol}
                  />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedProduct: (selectedProduct) => {
      dispatch(updateSelectedProductAction(selectedProduct));
    },

    addToCart: (item) => {
      dispatch(addToCartAction(item));
    },

    incrementProduct: (product) => {
      dispatch(incrementProductAction(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
