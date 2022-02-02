import React from 'react';
import './productPageStyles.css';


class ProductPage extends React.Component {
    constructor(props) {
        super(props);
    }


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

                    {this.props.selectedProduct.attributes.map((attribute) =>
                        <div>
                            <span className='sub-title-text'>{attribute.name.toUpperCase()}:</span>
                            <div>

                            </div>    
                        </div>
                    )}




                </div>

            </div>
        );
    }
}

export default ProductPage;