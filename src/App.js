import React from 'react';
import NavBar from './NavBar';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <h2>App Component</h2>

      </div>

    )
  };

}


export default App;