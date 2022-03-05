import React from "react";
import { connect } from "react-redux";
import {
  decrementProductAction,
  incrementProductAction,
} from "../actions/cartActions";
import changeAttributeAction from "../actions/changeAttributeAction";
import GetPrice from "../components/GetPrice";
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
    });

    return total;
  }
  displayAttribute(product, attribute) {
    switch (attribute.type) {
      case "text":
        return (
          <div className="attribute-name">
            {attribute.name.toUpperCase()}:
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
          <div className="attribute-name">
            {attribute.name.toUpperCase()}:
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
      <div>
        <div className="cartTitle">CART</div>

        {this.props.cartItems.map((item, index) => {
          return (
            <div className="itemCard" key={index}>
              <div className="flex-container">
                <div>
                  <b>{item.brand}</b>
                  <br />
                  {item.name}
                </div>
              </div>

              <div className="flex-container">
                <div className="qtyContainer">
                  <div
                    className="sign"
                    onClick={() => this.handleIncrement(item)}
                  >
                    +
                  </div>
                  <div className="qtyNum">{item.qtyy}</div>
                  <div
                    className="sign"
                    onClick={() => this.handleDecrement(item)}
                  >
                    -
                  </div>
                </div>

                <div className="imgContainer">
                  <img src={item.gallery[0]} alt="product-image" />
                </div>
              </div>

              <div className="attributes">
                {item.attributes.map((attribute) => {
                  return this.displayAttribute(item, attribute);
                })}
              </div>

              <GetPrice
                singleProduct={item}
                currencySymbol={this.props.currencySymbol}
              />
            </div>
          );
        })}
        <div className="totalPrice">
          Total: {this.props.activeCurrencySymbol}
          {this.getTotalPrice().toFixed(2)}
        </div>
      </div>
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
