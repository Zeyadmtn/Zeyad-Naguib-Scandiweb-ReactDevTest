import React from "react";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import activeCategoryAction from "../actions/activateCategoryAction";
import updateSelectedProductAction from "../actions/selectProductAction";
import "../styles/categoryPageStyles.css";
import ProductCard from "./ProductCard";

class CategoryProductsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.redirectToPDP = this.redirectToPDP.bind(this);
    this.productCategoryFilter = this.productCategoryFilter.bind(this);
  }

  redirectToPDP(singleProduct) {
    this.props.updateSelectedProduct(singleProduct);
  }

  productCategoryFilter() {
    switch (this.props.activeCategory) {
      case "all":
        return this.props.allProducts;
      default:
        return this.props.allProducts.filter((item) => {
          return item.category === this.props.activeCategory;
        });
    }
  }

  render() {
    const filteredProducts = this.productCategoryFilter();
    return (
      <Fade>
        <div>
          <h2 className="categoryName">
            {this.props.activeCategory.toUpperCase()}
          </h2>
          <div className="productDisplay">
            {filteredProducts.map((singleProduct) => {
              return <ProductCard product={singleProduct} />;
            })}
          </div>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.fetchReducer.allProducts,
    activeCategory: state.activeCategoryReducer.activeCategory,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedProduct: (selectedProduct) => {
      dispatch(updateSelectedProductAction(selectedProduct));
    },

    updateActiveCategory: (activeCategory) => {
      dispatch(activeCategoryAction(activeCategory));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProductsPage);
