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
    this.handleAttributeChange = this.handleAttributeChange.bind(this);

    this.state = {
      reRenderState: false,
      alertMessage: false,
      localProduct: this.props.selectedProduct,
      activeImage: this.props.selectedProduct.gallery[0],
    };
  }

  displayAttribute(attribute) {
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
                      this.handleAttributeChange(attribute, item);
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
                      this.handleAttributeChange(attribute, item);
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

  handleAttributeChange(chosenAttribute, chosenItem) {
    let tempProduct = JSON.parse(JSON.stringify(this.state.localProduct));
    tempProduct.attributes.map((attribute) => {
      if (attribute.id === chosenAttribute.id) {
        attribute.items.map((item) => {
          return (item.selected = false);
        });
      }

      attribute.items
        .filter((item) => {
          return item.id === chosenItem.id;
        })
        .map((el) => {
          return (el.selected = true);
        });

      return attribute;
    });

    let selectedAttributes = "";
    this.state.localProduct.attributes.map((attribute) => {
      attribute.items.map((item) => {
        if (item.selected === true) {
          return (selectedAttributes += item.id);
        }
      });
      return selectedAttributes;
    });

    tempProduct.cartID = tempProduct.id + selectedAttributes;

    this.setState({ ...this.state, localProduct: { ...tempProduct } });
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

  handleClick() {
    if (this.state.localProduct.attributes.length !== 0) {
      if (
        this.checkForAttributeSelection(this.state.localProduct.attributes) ===
        true
      ) {
        let filteredItemArr = this.props.cartItems.filter(
          (item) => item.cartID === this.state.localProduct.cartID
        );

        let tempProduct = JSON.parse(JSON.stringify(this.state.localProduct));

        if (filteredItemArr.length > 0) {
          this.props.incrementProduct(tempProduct);
        } else {
          this.props.addToCart(tempProduct);
          this.props.incrementProduct(tempProduct);
        }

        this.setState({ alertMessage: false });
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
          {this.state.localProduct.inStock ? (
            <div className="container">
              <div className="sideImagesContainer">
                {this.state.localProduct.gallery.map((prodImage) => (
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
                {this.state.localProduct.gallery.map((prodImage) => (
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
            <div className="prodBrand-PDP">{this.state.localProduct.brand}</div>

            <div className="prodTitle-PDP">{this.state.localProduct.name}</div>
            <br />

            {this.state.localProduct.attributes.map((attribute) => {
              return this.displayAttribute(attribute);
            })}

            {this.state.alertMessage && (
              <div className="alert-message-pdp">
                *Please select all attributes
              </div>
            )}

            <div className="attribute-name-PDP">
              PRICE: <br />
              <GetPrice
                singleProduct={this.state.localProduct}
                currencySymbol={this.props.activeCurrencySymbol}
                page={"PDP"}
              />
            </div>

            {this.state.localProduct.inStock ? (
              <div
                className="add-to-cart-button"
                onClick={() => {
                  this.handleClick();
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
              {this.state.localProduct.description.split(/[>,<,/,p]+/).join("")}
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
