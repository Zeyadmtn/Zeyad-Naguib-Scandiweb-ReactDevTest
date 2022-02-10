import { valueToObjectRepresentation } from '@apollo/client/utilities';
import React from 'react';
import './cartStyles.css'
import GetPrice from './GetPrice';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    getTotalPrice() {
        var total = 0;

        this.props.cartItems.map((item) => {
            item.prices.filter((price) => {
                return price.currency.symbol === this.props.currencySymbol
            }).map((el) => {
                return total += el.amount
            })
        })

        return total;
    }

    render() {
        return (
            <div>
                <div className="cartTitle">CART</div>

                {this.props.cartItems.map((item, index) => {

                    return <div className='itemCard' key={index}>
                        <div className="flex-container">

                            <div>
                                <b>{item.brand}</b><br />
                                {item.name}
                            </div>

                        </div>

                        <div className="flex-container">
                            <div className="qtyContainer">
                                <div className="sign">+</div>
                                <div className="qtyNum">{item.qtyy}</div>
                                <div className="sign">-</div>
                            </div>

                            <div className='imgContainer'>
                                <img src={item.gallery[0]} alt="product-image" />
                            </div></div>

                        <GetPrice singleProduct={item} currencySymbol={this.props.currencySymbol} />
                    </div>

                })}
                <div className='totalPrice'>Total: {this.props.currencySymbol}{this.getTotalPrice().toFixed(2)}</div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {

//     return { 
//       cartItems: state.cartItems
//      }
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       fetchData: () => {
//         dispatch(fetchAllProducts())
//       },

//       fetchCategories: () => {
//         dispatch(fetchCategoryNames())
//       },

//       updateSelectedProduct: (selectedProduct) => {
//         dispatch(updateSelectedProductAction(selectedProduct))
//       },

//       updateActiveCategory: (activeCategory) => {
//         dispatch(activeCategoryAction(activeCategory))
//       }
//     }
//   };



//export default connect(mapStateToProps, null)(Cart);
export default Cart;
