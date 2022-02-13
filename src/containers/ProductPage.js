import React from "react";
import { connect } from "react-redux";
import {
  addToCartAction,
  incrementProductAction,
} from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import GetPrice from "../components/GetPrice";
import "../styles/productPageStyles.css";

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
    cartItems: state.cartReducer.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCartAction(item));
    },

    changeAtr: (attribute, product) => {
      dispatch(changeAttributeAction(attribute, product));
    },

    incrementProduct: (product) => {
      dispatch(incrementProductAction(product));
    },
  };
};

class ProductPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.displayAttribute = this.displayAttribute.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeAttribute = this.changeAttribute.bind(this);

    this.state = { chosenItem: 0 };
  }

  changeAttribute(item) {
    this.setState({ chosenItem: item });
  }

  displayAttribute(attribute, key) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-name" key={key}>
            {attribute.name.toUpperCase()}:
            <div className="attribute-text">
              {attribute.items.map((item) => {
                return (
                  <div
                    className="attribute-text-item"
                    key={item.id}
                    onClick={() => this.changeAttribute(item)}
                  >
                    {item.displayValue}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "swatch":
        return (
          <div className="attribute-name" key={key}>
            {attribute.name}
            <div className="attribute-swatch">
              {attribute.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={"color-box-" + item.displayValue.toLowerCase()}
                  ></div>
                );
              })}
            </div>
          </div>
        );

      default:
        return <h1>default case</h1>;
    }
  }

  handleClick(product) {
    if (product.qtyy > 0) {
      this.props.incrementProduct(product);
    } else {
      this.props.incrementProduct(product);
      this.props.changeAtr(this.state.chosenItem, this.props.selectedProduct);
      this.props.addToCart(product);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="sideImagesContainer">
          {this.props.selectedProduct.gallery.map((prodImage, index) => (
            <img key={index} className="sideImages" src={prodImage} />
          ))}
        </div>

        <div className="mainImgContainer">
          <div className="container">
            <img
              className="mainImg"
              src={this.props.selectedProduct.gallery[0]}
            />
          </div>
        </div>

        <div className="infoAndActionColumn">
          <div className="prodBrand">{this.props.selectedProduct.brand}</div>
          <br />

          <div className="prodTitle">{this.props.selectedProduct.name}</div>
          <br />

          {this.props.selectedProduct.attributes.map((attribute, key) => {
            return this.displayAttribute(attribute, key);
          })}

          <div className="attribute-name">
            PRICE: <br />
            <GetPrice
              singleProduct={this.props.selectedProduct}
              currencySymbol={this.props.activeCurrencySymbol}
            />
          </div>

          <div
            className="add-to-cart-button"
            onClick={() => {
              this.handleClick(this.props.selectedProduct);
            }}
          >
            ADD TO CART
          </div>

          <div className="product-description">
            {this.props.selectedProduct.description
              .split(/[>,<,/,p]+/)
              .join("")}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
