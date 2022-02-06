import React from 'react';
import NavBar from './NavBar';
import CategoryProductsPage from './CategoryPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from './ProductPage';
import Cart from './Cart';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
    this.props.fetchCategories();
    this.props.fetchAllCurrencies();

  }

  render() {

    return (
      <Router>
        <NavBar />
        <Routes>

          <Route path='/product-page' element={<ProductPage selectedProduct={this.props.selectedProduct} 
            currencySymbol={this.props.activeCurrencySymbol}
            cartItems={this.props.cartItems}
            addToCart={this.props.addToCart}/>}
             />
          
          <Route path='/' element={<CategoryProductsPage dataFetched={this.props}
            updateSelectedProduct={this.props.updateSelectedProduct}
            activeCategory={this.props.activeCategory}
            updateActiveCategory={this.props.updateActiveCategory}
            currencySymbol={this.props.activeCurrencySymbol} />} />

          <Route path='/cart' element={<Cart cartItems={this.props.cartItems}/>} />

        </Routes>
      </Router>

    )
  };

}


export default App;