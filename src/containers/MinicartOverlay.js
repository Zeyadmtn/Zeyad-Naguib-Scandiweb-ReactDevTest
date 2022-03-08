import React from "react";
import { connect } from "react-redux";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import {
  decrementProductAction,
  incrementProductAction,
} from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import GetPrice from "../components/GetPrice";
import ProductImageSwitcher from "../components/ProductImageSwitcher";
import "../styles/minicartOverlayStyles.css";

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

class MinicartOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.state = { reRenderState: false };
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
    });

    return total;
  }

  displayAttribute(product, attribute) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-text">
            {attribute.items.map((item) => {
              return item.selected ? (
                <div className="attribute-text-item-selected" key={item.id}>
                  {item.displayValue}
                </div>
              ) : (
                <div
                  className="attribute-text-item"
                  key={item.id}
                  onClick={() => {
                    this.props.changeAtr(attribute, item, product);
                    this.setState({ reRenderState: !this.state.reRenderState });
                  }}
                >
                  {item.displayValue}
                </div>
              );
            })}
          </div>
        );

      case "swatch":
        return (
          <div className="attribute-swatch">
            {attribute.items.map((item) => {
              return item.selected ? (
                <span className="swatch-border">
                  <div
                    className={"color-box-" + item.displayValue.toLowerCase()}
                    key={item.id}
                  ></div>
                </span>
              ) : (
                <div
                  className={"color-box-" + item.displayValue.toLowerCase()}
                  key={item.id}
                  onClick={() => {
                    this.props.changeAtr(attribute, item, product);
                    this.setState({ reRenderState: !this.state.reRenderState });
                  }}
                ></div>
              );
            })}
          </div>
        );
      default:
        return <h1>default case</h1>;
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

  /*
        B-ClassName is used because otherwise these 
        elements are inheriting the cartStyles.css which is not wanted
    */

  render() {
    return (
      <Fade>
      <div className="minicart-box">
        <div className="minicart-title">
          My bag, {this.props.cartItems.length} item(s)
        </div>

        {this.props.cartItems.map((item, index) => {
          return (
            <div className="B-itemCard" key={index}>
              <div className="B-brand-name">
                {item.brand}
                <br />
                <div className="B-item-name"></div>
                {item.name}

                <div className="item-price">
                  <GetPrice
                    singleProduct={item}
                    currencySymbol={this.props.activeCurrencySymbol}
                  />
                </div>
              </div>

              <div className="right-items">
                <div className="B-qtyContainer">
                  <div
                    className="B-sign"
                    onClick={() => this.handleIncrement(item)}
                  >
                    +
                  </div>
                  <div className="B-qtyNum">{item.qtyy}</div>
                  <div
                    className="B-sign"
                    onClick={() => this.handleDecrement(item)}
                  >
                    -
                  </div>
                </div>
                <div className="imgContainer">
                  <ProductImageSwitcher product={item} page="minicart" />
                </div>
              </div>

              <div className="B-attributes">
                {item.attributes.map((attribute) => {
                  return this.displayAttribute(item, attribute);
                })}
              </div>
            </div>
          );
        })}

        <div className="total-price-container">
          <div className="total-price-title">Total</div>
          <span className="total-price">
            {this.props.activeCurrencySymbol}
            {this.getTotalPrice()}
          </span>
        </div>

        <div className="minicartButtons">
          <Link to="/cart">
            <div className="viewBagButton">VIEW BAG</div>
          </Link>

          <div className="checkOut">CHECKOUT</div>
        </div>
      </div>
      </Fade>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinicartOverlay);
