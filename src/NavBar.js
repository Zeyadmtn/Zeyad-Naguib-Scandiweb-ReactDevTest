import React from 'react';
import './navBarStyles.css';
import cart_icon from './images/cart_icon.jpg';
import store_logo from './images/store_logo3.png';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='navBar'>
                <button className='navTypeSelectBtn'>Woman</button>
                <button className='navTypeSelectBtn'>Men</button>
                <button className='navTypeSelectBtn'>Kids</button>

                <div className="store_logo">
                     <img src={store_logo} alt="store_logo" />
                </div>
                

                <div className="currencySelector">
                    <select name="$">
                        <option value="">$</option>
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                        <option value="JPY">¥ JPY</option>
                    </select>
                </div>

                <img src={cart_icon} alt="cart_icon" className="cart_icon" />
                

            </div>
        )
    };

}


export default NavBar;