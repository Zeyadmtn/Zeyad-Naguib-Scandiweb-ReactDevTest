import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import activeCategoryAction from "../actions/activateCategoryAction";
import updateSelectedProductAction from "../actions/selectProductAction";
import GetPrice from "../components/GetPrice";
import add_to_cart_circle from "../images/add_to_cart_circle.png";
import "../styles/categoryPageStyles.css";

class CategoryProductsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleATCIcon = this.toggleATCIcon.bind(this);
    this.setATCIconFalse = this.setATCIconFalse.bind(this);
    this.redirectToPDP = this.redirectToPDP.bind(this);
    this.productCategoryFilter = this.productCategoryFilter.bind(this);
    this.state = { toggleATCIcon: false };
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

  toggleATCIcon() {
    this.setState({ toggleATCIcon: !this.state.toggleATCIcon });
  }

  setATCIconFalse(){
    if (this.state.toggleATCIcon === true){
      this.setState({toggleATCIcon: false})
    }
  }
  


  render() {
    const filteredProducts = this.productCategoryFilter();
    return (
      <div>
        <h2 className="categoryName">
          {this.props.activeCategory.toUpperCase()}
        </h2>
        <div className="productDisplay">
          {filteredProducts.map((singleProduct) =>
            !singleProduct.inStock ? (
              <div
                onClick={() => this.redirectToPDP(singleProduct)}
                key={singleProduct.id}
              >
                <div
                  className="productItem"
                  onMouseOver={() => this.toggleATCIcon()}
                  onMouseOut={() => this.toggleATCIcon()}
                >
                  {/* {this.state.toggleATCIcon ? (
                    <img src={add_to_cart_circle} alt="add-to-cart" />
                  ) : null} */}

                  <Link to="/product-page">
                    <div className="productImage">
                      <div className="outOfStock">OUT OF STOCK</div>
                      <img
                        style={{ opacity: "0.3" }}
                        className="productImage"
                        src={singleProduct.gallery[0]}
                        alt="prod-img"
                      />
                    </div>
                    <div className="productName" style={{ color: "grey" }}>
                      {singleProduct.name}
                    </div>
                    <div className="productPrice">
                      <GetPrice
                        singleProduct={singleProduct}
                        currencySymbol={this.props.activeCurrencySymbol}
                      />
                    </div>
                  </Link>
                  {() => this.toggleATCIcon()}
                </div>
              </div>
            ) : (
              <div
                onClick={() => this.redirectToPDP(singleProduct)}
                key={singleProduct.id}
              >
                <Link to="/product-page">
                  <div className="productItem">
                    <div className="productImage">
                      <img
                        className="productImage"
                        src={singleProduct.gallery[0]}
                        alt="prod-img"
                      />
                    </div>
                    <div className="productName">{singleProduct.name}</div>
                    <div className="productPrice">
                      <GetPrice
                        singleProduct={singleProduct}
                        currencySymbol={this.props.activeCurrencySymbol}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
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
