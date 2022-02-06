import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import {fetchAllProducts, fetchCategoryNames, fetchCurrencies} from './redux/actions/fetchAction'
import { connect } from 'react-redux'
import {ApolloProvider} from "@apollo/client";
import {client} from './redux/graphql/client';
import updateSelectedProductAction from './redux/actions/selectProductAction'
import activeCategoryAction from './redux/actions/activateCategoryAction';
import activeCurrencyAction from './redux/actions/activeCurrencyAction';
import addToCartAction from './redux/actions/addToCartAction';
import cartReducer from './redux/reducers/cartReducer';


const mapStateToProps = (state) => {
  
  return { 
    data: state, 
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCategory: state.activeCategoryReducer.activeCategory,
    categoryNames: state.fetchReducer.categoryNames,
    availableCurrencies: state.fetchReducer.availableCurrencies,
    activeCurrency: state.activeCurrencyReducer.activeCurrency,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
    cartItems: state.cartReducer.cartItems
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
    },

    fetchAllCurrencies: () => {
      dispatch(fetchCurrencies())
    },

    updateActiveCurrency: (currency) => {
      dispatch(activeCurrencyAction(currency))
    },

    addToCart: (item) => {
      dispatch(addToCartAction(item))
    }
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


class AppWrapper extends React.Component {

  
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <ConnectedApp />
          </PersistGate>
        </Provider>
      </ApolloProvider>

    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

