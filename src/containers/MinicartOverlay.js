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
import minus_square from "../images/minus_square.png";
import plus_square from "../images/plus_square.png";
import "../styles/minicartOverlayStyles.css";

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
      return item;
    });

    return total;
  }

  displayAttribute(product, attribute) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-text-minicart" key={attribute.id}>
            {attribute.items.map((item) => {
              return item.selected ? (
                <div
                  className="attribute-text-item-selected-minicart"
                  key={item.id}
                >
                  {item.displayValue}
                </div>
              ) : (
                <div
                  className="attribute-text-item-minicart"
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
          <div className="attribute-swatch-minicart" key={attribute.id}>
            {attribute.items.map((item) => {
              return item.selected ? (
                <span className="swatch-border-minicart" key={item.id}>
                  <div
                    className={
                      "color-box-" +
                      item.displayValue.toLowerCase() +
                      "-minicart"
                    }
                    key={item.id}
                  ></div>
                </span>
              ) : (
                <div
                  className={
                    "color-box-" + item.displayValue.toLowerCase() + "-minicart"
                  }
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
            <span className="minicart-title-mybag">My bag, </span>
            {this.props.cartItems.length} item(s)
          </div>

          {this.props.cartItems.map((item) => {
            return (
              <div className="itemCard-minicart" key={item.id}>
                <div className="brand-name-minicart">
                  {item.brand}
                  <br />
                  <div className="item-name-minicart"></div>
                  {item.name}

                  <div className="item-price-minicart">
                    <GetPrice
                      singleProduct={item}
                      currencySymbol={this.props.activeCurrencySymbol}
                      page={"minicart"}
                    />
                  </div>
                </div>

                <div className="right-items-minicart">
                  <div className="qtyContainer-minicart">
                    <img
                      src={plus_square}
                      alt="Plus Square"
                      className="sign-plus-minicart"
                      onClick={() => this.handleIncrement(item)}
                    />
                    <div className="qtyNum-minicart">{item.qtyy}</div>
                    <img
                      src={minus_square}
                      alt="Minus Square"
                      className="sign-minus-minicart"
                      onClick={() => this.handleDecrement(item)}
                    />
                  </div>

                  {/* Switching images for a product can be activated in the minicart overlay
                by setting the imageSwitching={true} below */}
                  <div className="imgContainer-minicart">
                    <ProductImageSwitcher
                      product={item}
                      page="minicart"
                      imageSwitching={false}
                    />
                  </div>
                </div>

                <div className="attributes-minicart">
                  {item.attributes.map((attribute) => {
                    return this.displayAttribute(item, attribute);
                  })}
                </div>
              </div>
            );
          })}

          <div className="total-price-container-minicart">
            <div className="total-price-title-minicart">Total</div>
            <span className="total-price-minicart">
              {this.props.activeCurrencySymbol}
              {this.getTotalPrice().toFixed(2)}
            </span>
          </div>

          <div className="minicartButtons">
            <Link to="/cart">
              <div className="view-bag-button"><div className="view-bag-button-text">VIEW BAG</div></div>
            </Link>

            <div className="checkout-button"><div className="checkout-button-text">CHECKOUT</div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MinicartOverlay);
