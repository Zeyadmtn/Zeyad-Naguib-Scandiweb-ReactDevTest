import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./containers/App";
import { client } from "./graphql/client";
import { persistor, store } from "./store/store";

class AppWrapper extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
