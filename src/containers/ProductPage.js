import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import {
  addToCartAction,
  incrementProductAction,
} from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import GetPrice from "../components/GetPrice";
import "../styles/productPageStyles.css";

class ProductPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.displayAttribute = this.displayAttribute.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayImageGallery = this.displayImageGallery.bind(this);
    this.checkForAttributeSelection =
      this.checkForAttributeSelection.bind(this);

    this.state = {
      reRenderState: false,
      alertMessage: false,
      activeImage: this.props.selectedProduct.gallery[0],
    };
  }

  displayAttribute(product, attribute) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-name-PDP" key={attribute.id}>
            {attribute.name.toUpperCase()}:
            <div className="attribute-text-PDP">
              {attribute.items.map((item) => {
                return item.selected ? (
                  <div
                    className="attribute-text-item-selected-PDP"
                    key={item.id}
                  >
                    {item.displayValue}
                  </div>
                ) : (
                  <div
                    className="attribute-text-item-PDP"
                    key={item.id}
                    onClick={() => {
                      this.props.changeAtr(attribute, item, product);
                      this.setState({
                        reRenderState: !this.state.reRenderState,
                      });
                    }}
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
          <div className="attribute-name-PDP" key={attribute.id}>
            {attribute.name.toUpperCase()}:
            <div className="attribute-swatch-PDP">
              {attribute.items.map((item) => {
                return item.selected ? (
                  <span className="swatch-border-PDP" key={item.id}>
                    <div
                      className={
                        "color-box-" + item.displayValue.toLowerCase() + "-PDP"
                      }
                      key={item.id}
                    ></div>
                  </span>
                ) : (
                  <div
                    className={
                      "color-box-" + item.displayValue.toLowerCase() + "-PDP"
                    }
                    key={item.id}
                    onClick={() => {
                      this.props.changeAtr(attribute, item, product);
                      this.setState({
                        reRenderState: !this.state.reRenderState,
                      });
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        );
      default:
        return <h1>Error occured displaying product attributes.</h1>;
    }
  }

  checkForAttributeSelection(attributes) {
    let allAttributesSelected = true;

    attributes.map((singleAttribute) => {
      let attributeHasSelectedItem = false;
      singleAttribute.items.map((singleItem) => {
        if (singleItem.selected === true) {
          attributeHasSelectedItem = true;
        }
        return attributeHasSelectedItem;
      });

      if (attributeHasSelectedItem === false) {
        allAttributesSelected = false;
      }
      return allAttributesSelected;
    });

    return allAttributesSelected;
  }

  handleClick(product) {
    if (product.attributes.length !== 0) {
      if (this.checkForAttributeSelection(product.attributes) === true) {
        this.setState({ alertMessage: false });
        if (product.qtyy > 0) {
          this.props.incrementProduct(product);
        } else {
          this.props.incrementProduct(product);
          this.props.addToCart(product);
        }
      } else {
        this.setState({ alertMessage: true });
      }
    }
  }

  /* The user can change the main image by clicking on any one of the images on the left side */
  displayImageGallery(prodImage) {
    this.setState({ activeImage: prodImage });
  }

  render() {
    return (
      <Fade left cascade>
        <div className="container">
          {this.props.selectedProduct.inStock ? (
            <div className="container">
              <div className="sideImagesContainer">
                {this.props.selectedProduct.gallery.map((prodImage) => (
                  <img
                    onClick={() => this.displayImageGallery(prodImage)}
                    key={prodImage}
                    className="sideImages"
                    src={prodImage}
                    alt="product"
                  />
                ))}
              </div>

              <div className="mainImgContainer">
                <div className="container">
                  <img
                    className="mainImg"
                    src={this.state.activeImage}
                    alt="product"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="sideImagesContainer">
                {this.props.selectedProduct.gallery.map((prodImage) => (
                  <img
                    onClick={() => this.displayImageGallery(prodImage)}
                    key={prodImage}
                    className="sideImages"
                    src={prodImage}
                    alt="product"
                  />
                ))}
              </div>

              <div className="mainImgContainer">
                <div className="container">
                  <img
                    className="mainImg"
                    src={this.state.activeImage}
                    alt="product"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="infoAndActionColumn">
            <div className="prodBrand-PDP">
              {this.props.selectedProduct.brand}
            </div>

            <div className="prodTitle-PDP">
              {this.props.selectedProduct.name}
            </div>
            <br />

            {this.props.selectedProduct.attributes.map((attribute) => {
              return this.displayAttribute(
                this.props.selectedProduct,
                attribute
              );
            })}

            {this.state.alertMessage && (
              <div className="alert-message-pdp">
                *Please select all attributes
              </div>
            )}

            <div className="attribute-name-PDP">
              PRICE: <br />
              <GetPrice
                singleProduct={this.props.selectedProduct}
                currencySymbol={this.props.activeCurrencySymbol}
                page={"PDP"}
              />
            </div>

            {this.props.selectedProduct.inStock ? (
              <div
                className="add-to-cart-button"
                onClick={() => {
                  this.handleClick(this.props.selectedProduct);
                }}
              >
                ADD TO CART
              </div>
            ) : (
              <div>
                <div className="add-to-cart-button-notInStock">ADD TO CART</div>
                <p className="out-of-stock-tag">Out of Stock</p>
              </div>
            )}

            <div className="product-description">
              {this.props.selectedProduct.description
                .split(/[>,<,/,p]+/)
                .join("")}
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

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

    changeAtr: (attribute, item, product) => {
      dispatch(changeAttributeAction(attribute, item, product));
    },

    incrementProduct: (product) => {
      dispatch(incrementProductAction(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
