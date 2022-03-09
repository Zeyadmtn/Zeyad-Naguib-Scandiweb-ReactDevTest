import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  addToCartAction,
  incrementProductAction,
} from "../actions/cartActions";
import updateSelectedProductAction from "../actions/selectProductAction";
import GetPrice from "../components/GetPrice";
import add_to_cart_circle from "../images/add_to_cart_circle.png";
import "../styles/categoryPageStyles.css";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToPDP = this.redirectToPDP.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.displayAddToCartIcon = this.displayAddToCartIcon.bind(this);
    this.state = { toggleATCIcon: false };
    this.handleIconToggle = this.handleIconToggle.bind(this);
  }

  redirectToPDP(singleProduct) {
    this.props.updateSelectedProduct(singleProduct);
  }

  handleIconToggle(bool) {
    this.setState({ toggleATCIcon: bool });
  }

  handleAddToCartClick(product) {
    console.log("clickhandled");
    if (product.attributes.length === 0) {
      if (product.qtyy <= 0) {
        this.props.addToCart(product);
        this.props.incrementProduct(product);
      } else {
        this.props.incrementProduct(product);
      }
    } else {
      this.props.updateSelectedProduct(product);
      <Navigate to="/product-page" />;
    }
  }

  displayAddToCartIcon(product) {
    if (this.state.toggleATCIcon) {
      if (product.attributes.length !== 0) {
        this.props.updateSelectedProduct(product);
        return (
          <Link to="/product-page">
            <img
              src={add_to_cart_circle}
              alt="addToCartButton"
              className="atc-icon"
            />
          </Link>
        )
      } else {
        return (
          <img
              src={add_to_cart_circle}
              alt="addToCartButton"
              className="atc-icon"
              onClick={() => {
                if (product.qtyy <= 0) {
                  this.props.addToCart(product);
                  this.props.incrementProduct(product);
                } else {
                  this.props.incrementProduct(product);
                }
              }}
            />
        )
      }
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
            onMouseLeave={() => this.handleIconToggle(false)}
          >
            {this.displayAddToCartIcon(product)}

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
