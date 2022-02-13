import React from "react";
import Select from "react-dropdown-select";
import { connect } from "react-redux";
import activeCurrencyAction from "../actions/activeCurrencyAction";
import "../styles/navBarStyles.css";

class CurrencySelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    return this.props.updateActiveCurrency(event[0]);
  }

  render() {
    const currencies = this.props.availableCurrencies.map((item) => ({
      symbol: item.symbol,
      label: item.label,
      labelDisplayed: item.symbol + " " + item.label,
    }));

    return (
      <div className="currencySelectContainer">
        <Select
          className="currencySelect"
          value={this.props.activeCurrencySymbol}
          options={currencies}
          placeholder={this.props.activeCurrencySymbol}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    availableCurrencies: state.fetchReducer.availableCurrencies,
    activeCurrency: state.activeCurrencyReducer.activeCurrency,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveCurrency: (currency) => {
      dispatch(activeCurrencyAction(currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
