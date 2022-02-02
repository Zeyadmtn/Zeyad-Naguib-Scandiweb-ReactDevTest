import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import {fetchAllProducts} from './redux/actions/fetchAction'
import { connect } from 'react-redux'
import {ApolloProvider} from "@apollo/client";
import {client} from './redux/graphql/client';
import productsFetchedAction from './redux/actions/selectProductAction'


const mapStateToProps = (state) => {
  return { data: state, selectedProduct: state.selectedProduct }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchAllProducts())
    },

    selectedProduct: (selectedProduct) => {
      dispatch(productsFetchedAction(selectedProduct))
    }
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


class AppWrapper extends React.Component {

  
  render() {
    console.log("AppWrapper before return");
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

