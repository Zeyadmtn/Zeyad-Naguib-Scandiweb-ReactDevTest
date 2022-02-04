import React from 'react';
import './productPageStyles.css';


class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayAttribute = this.displayAttribute.bind(this);
    }

    displayAttribute(attribute) {
        switch (attribute.id) {
            case "Size":
            case "Capacity":
            case "With USB 3 ports":
            case "Touch ID in keyboard":
                return <div className="attribute-name">
                    {attribute.name.toUpperCase()}:

                    <div className="attribute-text">
                        {attribute.items.map((item) => {
                            return <div className='attribute-text-item' key={item.id}>{item.displayValue}</div>
                        })}
                    </div>
                </div>

            case "Color":
                return <div className='attribute-name'>{attribute.name}
                    <div className="attribute-swatch">
                        {attribute.items.map((item) => {
                            return <div key={item.id} className={"color-box-" + (item.displayValue.toLowerCase())}>
                            </div>
                        })}
                    </div>
                </div>




            default:
                return <h1>default case</h1>
        }
    };


    render() {
        return (
            <div className='container'>
                <div className="sideImagesContainer">
                    {this.props.selectedProduct.gallery.map((prodImage, index) =>
                        <img key={index} className="sideImages" src={prodImage} />
                    )}
                </div>

                <div className="mainImgContainer">
                    <div className="container">
                        <img className='mainImg' src={this.props.selectedProduct.gallery[0]} />
                    </div>
                </div>

                <div className='infoAndActionColumn'>
                    <div className="prodBrand">
                        {this.props.selectedProduct.brand}
                    </div>
                    <br />

                    <div className="prodTitle">
                        {this.props.selectedProduct.name}
                    </div>
                    <br />

                    {this.props.selectedProduct.attributes.map((attribute, key) => {
                        return this.displayAttribute(attribute)
                    })}

                    <div className="attribute-name">
                        PRICE: <br/>
                        {this.props.selectedProduct.prices[0].currency.symbol}
                        {Math.floor(this.props.selectedProduct.prices[0].amount)}
                    </div>

                    <div className="add-to-cart-button">
                        ADD TO CART
                    </div>

                    <div className="product-description">
                    {this.props.selectedProduct.description.split(/[>,<,/,p]+/).join('')}
                    </div>
                    

                </div>
            </div>
        );
    }
}

export default ProductPage;