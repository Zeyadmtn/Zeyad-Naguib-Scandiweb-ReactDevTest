import React from 'react';
import './minicartOverlayStyles.css';
import { connect } from 'react-redux';
import { decrementProductAction, incrementProductAction } from "./redux/actions/cartActions";
import changeAttributeAction from "./redux/actions/changeAttributeAction";
import GetPrice from './GetPrice';
import { Link } from "react-router-dom";


const mapStateToProps = (state) => {

    return {
        activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
        cartItems: state.cartReducer.cartItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAtr: (attribute, product) => {
            dispatch(changeAttributeAction(attribute, product))
        },

        incrementProduct: (product) => {
            dispatch(incrementProductAction(product))
        },

        decrementProduct: (product) => {
            dispatch(decrementProductAction(product))
        }
    }
};

class MinicartOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    getTotalPrice() {
        var total = 0;

        this.props.cartItems.map((item) => {
            item.prices
                .filter((price) => {
                    return price.currency.symbol === this.props.currencySymbol;
                })
                .map((el) => {
                    return (total = total + (el.amount * item.qtyy));
                });
        });

        return total;
    }

    displayAttribute(attribute, key) {
        switch (attribute.type) {
            case "text":
                return (
                    <div className="attribute-text">
                        {attribute.items.map((item) => {
                            if (item.selected == true) {
                                return (
                                    <div
                                        className="attribute-text-item-selected"
                                        key={item.id}
                                        onClick={() => this.changeAttribute(item)}
                                    >
                                        {item.displayValue}
                                    </div>
                                );
                            }
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
                );

            case "swatch":
                return (
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
            <div className='minicart-box'>
                <div className="minicart-title">My bag, {this.props.cartItems.length} item(s)</div>

                {this.props.cartItems.map((item, index) => {
                    return (
                        <div className="B-itemCard" key={index}>
                            <div className="B-brand-name">
                                <b>{item.brand}</b>
                                <br />
                                <div className="B-item-name"></div>
                                {item.name}
                            </div>

                            {/* <div className="B-flex-container2"> */}
                            <div className='right-items'>
                                <div className="B-qtyContainer">
                                    <div className="B-sign" onClick={() => this.handleIncrement(item)}>+</div>
                                    <div className="B-qtyNum">{item.qtyy}</div>
                                    <div className="B-sign" onClick={() => this.handleDecrement(item)}>-</div>
                                </div>
                                {/* </div> */}
                                <img src={item.gallery[0]} alt="product-image" className='prodImg' /></div>

                            <div className="B-attributes">
                                {item.attributes.map((attribute, key) => {
                                    return this.displayAttribute(attribute, key);
                                })}
                            </div>

                            <GetPrice
                                singleProduct={item}
                                currencySymbol={this.props.currencySymbol}
                            />
                        </div>
                    );
                })}
                    <div className='minicartButtons'>
                    <Link to="/cart">
                        <div className="viewBagButton">
                            VIEW BAG
                        </div>
                    </Link>

                    <div className="checkOut">
                            CHECKOUT
                        </div>
                    </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinicartOverlay);
