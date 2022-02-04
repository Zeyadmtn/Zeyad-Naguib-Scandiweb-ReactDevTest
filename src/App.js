import React from 'react';
import NavBar from './NavBar';
import CategoryProductsPage from './categoryProductsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from './ProductPage';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
    this.props.fetchCategories();

  }

  render() {
    return (
      <Router>
        <NavBar categoryNames={this.props.categoryNames}/>
        <Routes>
          <Route path='/product-page' element={<ProductPage  selectedProduct = {this.props.selectedProduct}/>} />
          <Route path='/' element={<CategoryProductsPage dataFetched={this.props} 
          updateSelectedProduct={this.props.updateSelectedProduct}
          activeCategory={this.props.activeCategory}
          updateActiveCategory={this.props.updateActiveCategory} />} />

        </Routes>
      </Router>

    )
  };

}


export default App;