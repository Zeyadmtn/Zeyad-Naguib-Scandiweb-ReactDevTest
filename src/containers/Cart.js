import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import {
  decrementProductAction,
  incrementProductAction,
} from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import GetPrice from "../components/GetPrice";
import ProductImageSwitcher from "../components/ProductImageSwitcher";
import minus_square_bigger from "../images/minus_square_bigger.png";
import plus_square_bigger from "../images/plus_square_bigger.png";
import "../styles/cartStyles.css";
import "../styles/productPageStyles.css";

class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.displayAttribute = this.displayAttribute.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.state = { reRenderComp: true };
  }

  getTotalPrice() {
    var total = 0;

    this.props.cartItems.map((item) => {
      item.prices
        .filter((price) => {
          return price.currency.symbol === this.props.activeCurrencySymbol;
        })
        .map((el) => {
          return (total = total + el.amount * item.qtyy);
        });
      return item;
    });

    return total;
  }
  displayAttribute(product, attribute) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-name-cart" key={attribute.id}>
            <div className="attribute-text-cart">
              {attribute.items.map((item) => {
                return item.selected ? (
                  <div
                    className="attribute-text-item-selected-cart"
                    key={item.id}
                  >
                    {item.displayValue}
                  </div>
                ) : (
                  <div
                    className="attribute-text-item-cart"
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
          <div className="attribute-name-cart" key={attribute.id}>
            <div className="attribute-swatch-cart">
              {attribute.items.map((item) => {
                return item.selected ? (
                  <span className="swatch-border-cart" key={item.id}>
                    <div
                      className={
                        "color-box-" + item.displayValue.toLowerCase() + "-cart"
                      }
                      key={item.id}
                    ></div>
                  </span>
                ) : (
                  <div
                    className={
                      "color-box-" + item.displayValue.toLowerCase() + "-cart"
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

  handleIncrement(product) {
    this.props.incrementProduct(product);
    this.setState({ reRenderComp: !this.state.reRenderComp });
  }

  handleDecrement(product) {
    this.props.decrementProduct(product);
    this.setState({ reRenderComp: !this.state.reRenderComp });
  }

  render() {
    return (
      <Fade bottom cascade>
        <div>
          <div className="cartTitle">CART</div>

          {this.props.cartItems.map((item) => {
            return (
              <div className="itemCard-cart" key={item.id}>
                <div className="flex-container-column-cart">
                  <div className="brand-name-cart">{item.brand}</div>
                  <br />
                  <div className="item-name-cart"> {item.name}</div>
                  <GetPrice
                    singleProduct={item}
                    currencySymbol={this.props.activeCurrencySymbol}
                    page={"cart"}
                  />
                  <div className="attributes-cart">
                    {item.attributes.map((attribute) => {
                      return this.displayAttribute(item, attribute);
                    })}
                  </div>
                </div>
                <div className="flex-container-column-cart">
                  <img
                    src={plus_square_bigger}
                    className="sign-plus-cart"
                    onClick={() => this.handleIncrement(item)}
                    alt="Plus Square"
                  ></img>
                  <div className="qtyNum-cart">{item.qtyy}</div>
                  <img
                    src={minus_square_bigger}
                    className="sign-minus-cart"
                    onClick={() => this.handleDecrement(item)}
                    alt="Minus Square"
                  ></img>

                  <div className="imgContainer-cart">
                    <ProductImageSwitcher
                      product={item}
                      page="cart"
                      imageSwitching={true}
                    />
                  </div>
                </div>

                <GetPrice
                  singleProduct={item}
                  currencySymbol={this.props.currencySymbol}
                />
              </div>
            );
          })}
          <div className="total-price-cart">
            <div className="total-price-title-cart">Total:</div>
            <div className="total-price-number-cart">
              {this.props.activeCurrencySymbol}
              {this.getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
    cartItems: state.cartReducer.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAtr: (attribute, item, product) => {
      dispatch(changeAttributeAction(attribute, item, product));
    },

    incrementProduct: (product) => {
      dispatch(incrementProductAction(product));
    },

    decrementProduct: (product) => {
      dispatch(decrementProductAction(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
