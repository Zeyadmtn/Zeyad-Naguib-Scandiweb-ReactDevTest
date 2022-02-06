import React from 'react';
import './cartStyles.css'

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div>
                <div className="cartTitle">CART</div>
                {this.props.cartItems.map((item) =>
                    {return <div className='itemCard'>
                        {item.name}
                        <img src={item.gallery[0]} alt="product-image" />
                    </div>
                    })}
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
 