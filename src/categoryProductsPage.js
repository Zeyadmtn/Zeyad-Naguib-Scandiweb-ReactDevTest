import React from 'react';
import './styles.css';
import { connect } from 'react-redux';


class CategoryProductsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2 className='categoryName'>Category Name</h2>
                <div className='productDisplay'>
                    {this.props.dataFetched.data.fetchReducer.allProducts.map((singleProduct) =>
                        <div>
                            <div className="productItem">
                                <div className="productImage">
                                    <img src={singleProduct.gallery[0]} alt="prod-image" />
                                </div>
                                <h1>{singleProduct.name}</h1>
                                <p>${Math.floor(singleProduct.prices[0].amount)}</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>);
    }
}


export default CategoryProductsPage;