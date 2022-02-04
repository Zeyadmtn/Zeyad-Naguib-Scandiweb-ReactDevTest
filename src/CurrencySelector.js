import React from 'react';
import { connect } from 'react-redux';
import activeCurrencyAction from './redux/actions/activeCurrencyAction';
import dropDownIcon from './images/dropdownDown.svg'
import './navBarStyles.css'
class CurrencySelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    handleDropDown() {
        return <div>test</div>
        // return <div className="allCurrencies">
        //         {this.props.availableCurrencies.map((currency) => 
        //             <div key={currency.symbol}>
        //                 {currency.symbol}
        //                 {currency.label}

        //             </div>               
        //         )}
        //     </div>
    }

    render() {
        return (
            <div>
                <div className="activeCurrency" onClick={() => this.handleDropDown()}>
                    {this.props.activeCurrencySymbol}
                    <img src={dropDownIcon} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        availableCurrencies: state.fetchReducer.availableCurrencies,
        activeCurrency: state.activeCurrencyReducer.activeCurrency,
        activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveCurrency: (currency) => {
            dispatch(activeCurrencyAction(currency))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);