import React from 'react';
import NavBar from './NavBar';
import './styles.css';
import CategoryProductsPage from './categoryProductsPage';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (

      <div>
        <NavBar />
        <CategoryProductsPage dataFetched ={this.props}/>
      </div>

    )
  };

}


export default App;