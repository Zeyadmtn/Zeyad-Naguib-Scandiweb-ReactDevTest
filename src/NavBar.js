import React from 'react';
import './navBarStyles.css';
import cart_icon from './images/cart_icon.jpg';
import store_logo from './images/store_logo3.png';
import { connect } from 'react-redux';
import { fetchAllProducts, fetchCategoryNames } from './redux/actions/fetchAction';
import updateSelectedProductAction from './redux/actions/selectProductAction';
import activeCategoryAction from './redux/actions/activateCategoryAction';
import { Link } from 'react-router-dom';
import CurrencySelector from './CurrencySelector';
import MinicartOverlay from './MinicartOverlay.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCategoryButton = this.handleCategoryButton.bind(this);
    this.toggleMiniCartOverlay = this.toggleMiniCartOverlay.bind(this);

    this.state = { miniCartOverlay: false };
  }

  handleCategoryButton(category) {
    this.props.updateActiveCategory(category);

  }

  toggleMiniCartOverlay() {
    this.setState({ miniCartOverlay: !this.state.miniCartOverlay })
  }

  render() {
    return (
      <div className='navBar'>
        {this.props.categoryNames.map((category) =>
          <Link to="/" key={category.name}>
            <button className='navTypeSelectBtn' onClick={() => this.handleCategoryButton(category.name)}>{category.name}</button>
          </Link>
        )}

        <div className="store_logo">
          <img src={store_logo} alt="store_logo" />
        </div>

        <CurrencySelector />

        <div onClick={() => { this.toggleMiniCartOverlay() }}>
          <img src={cart_icon} alt="cart_icon" className="cart_icon" />
        </div>

        {this.state.miniCartOverlay ? (
          <MinicartOverlay />
        ) : null}

        </div>
    )
  };

}

const mapStateToProps = (state) => {

  return {
    data: state,
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCategory: state.activeCategoryReducer.activeCategory,
    categoryNames: state.fetchReducer.categoryNames
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchAllProducts())
    },

    fetchCategories: () => {
      dispatch(fetchCategoryNames())
    },

    updateSelectedProduct: (selectedProduct) => {
      dispatch(updateSelectedProductAction(selectedProduct))
    },

    updateActiveCategory: (activeCategory) => {
      dispatch(activeCategoryAction(activeCategory))
    }
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);