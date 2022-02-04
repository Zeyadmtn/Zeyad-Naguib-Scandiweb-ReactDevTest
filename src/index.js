import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavBar from './NavBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import {fetchAllProducts, fetchCategoryNames, fetchCurrencies} from './redux/actions/fetchAction'
import { connect } from 'react-redux'
import {ApolloProvider} from "@apollo/client";
import {client} from './redux/graphql/client';
import updateSelectedProductAction from './redux/actions/selectProductAction'
import activeCategoryAction from './redux/actions/activateCategoryAction';
import activeCurrencyAction from './redux/actions/activeCurrencyAction';


const mapStateToProps = (state) => {
  
  return { 
    data: state, 
    selectedProduct: state.selectProductReducer.selectedProduct,
    activeCategory: state.activeCategoryReducer.activeCategory,
    categoryNames: state.fetchReducer.categoryNames,
    availableCurrencies: state.fetchReducer.availableCurrencies,
    activeCurrency: state.activeCurrencyReducer.activeCurrency,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol
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
    }
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


class AppWrapper extends React.Component {

  
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </ApolloProvider>

    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

