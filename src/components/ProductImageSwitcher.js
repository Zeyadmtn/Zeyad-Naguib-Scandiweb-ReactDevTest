// This component is used to display product images and handle image switching
import React from "react";
import arrow_left from "../images/arrow_left.png";
import arrow_right from "../images/arrow_right.png";

class ProductImageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageSwitching = this.handleImageSwitching.bind(this);
    this.state = { item: this.props.product, currentImageIndex: 0 };
  }


  handleImageSwitching(direction) {
    switch (direction) {
      case "left":
        if (this.state.currentImageIndex > 0) {
          console.log("left if works");
          this.setState({
            currentImageIndex: this.state.currentImageIndex - 1,
          });
        }
        break;
      case "right":
        if (this.state.currentImageIndex < this.state.item.gallery.length - 1) {
          this.setState({
            currentImageIndex: this.state.currentImageIndex + 1,
          });
        }
        break;
      default:
        console.log("image switching error");
    }
  }
  render() {
    return (
      <div>
        <div className={"arrow-left-container-" + this.props.page} onClick={() => this.handleImageSwitching("left")}></div>
        <img
          src={arrow_left}
          alt="arrow-left"
          className={"arrow-left-" + this.props.page}
          onClick={() => this.handleImageSwitching("left")}
        />
        <div className={"arrow-right-container-" + this.props.page} onClick={() => this.handleImageSwitching("right")}></div>
        <img
          src={arrow_right}
          alt="arrow-right"
          className={"arrow-right-" + this.props.page}
          onClick={() => this.handleImageSwitching("right")}
        />
        <img
          src={this.state.item.gallery[this.state.currentImageIndex]}
          alt="product"
          className={"product-img-" + this.props.page}
        />
      </div>
    );
  }
}



export default ProductImageSwitcher;
