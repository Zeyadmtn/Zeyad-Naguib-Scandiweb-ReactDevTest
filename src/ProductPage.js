import React from 'react';



class ProductPage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() { 
        return ( 
            <h1>product selected is {this.props.selectedProduct.id}</h1>
         );
    }
}
 
export default ProductPage;