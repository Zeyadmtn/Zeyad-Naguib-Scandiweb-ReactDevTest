import React from 'react';
import NavBar from './NavBar';
import './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log("BREAK LOG");
    console.log(this.props.data.fetchReducer.allProducts);
    return (
      <div>
        <NavBar />
        <h2>App Component</h2>
        <div className='productDisplay'>
          {this.props.data.fetchReducer.allProducts.map((singleProduct) =>
          <div>
            <img src={singleProduct.gallery[0]} alt="prod-image"/>
            <h1>{singleProduct.name}</h1>
            </div>
          )}
        </div>

      </div>

    )
  };

}


export default App;