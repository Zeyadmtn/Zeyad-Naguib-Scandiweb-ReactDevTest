import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import activeCurrencyAction from "../actions/activeCurrencyAction";
import arrow_down from "../images/arrow_down.png";
import arrow_up from "../images/arrow_up.png";
import "../styles/navBarStyles.css";

class CurrencySelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.displayCurrencyOptions = this.displayCurrencyOptions.bind(this);
    this.state = { toggleDropdown: false };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);

    if (this.state.toggleDropdown === true) {
      if (!domNode || !domNode.contains(event.target)) {
        this.setState({
          toggleDropdown: false,
        });
      }
    }
  };

  toggleDropdown() {
    if (this.props.miniCartOverlay === true) {
      console.log("truwe");
      this.setState({ toggleDropdown: false });
    } else {
      this.setState({ toggleDropdown: !this.props.toggleDropdown });
    }
  }

  changeHandler(currency) {
    return this.props.updateActiveCurrency(currency);
  }

  displayCurrencyOptions() {
    if (this.state.toggleDropdown === true) {
      return (
        <Fade down cascade>
          <div className="currencyDropDown">
            {this.props.availableCurrencies.map((currency) => {
              return (
                <div
                  className="currency"
                  onClick={() =>
                    this.changeHandler({
                      symbol: currency.symbol,
                      label: currency.label,
                    })
                  }
                  key={currency.label}
                >
                  {currency.symbol} &nbsp;
                  {currency.label}
                </div>
              );
            })}
          </div>
        </Fade>
      );
    }
  }

  render() {
    this.displayCurrencyOptions();

    return (
      <div
        className="currencySelectContainer"
        onClick={() => this.toggleDropdown()}
      >
        {this.state.toggleDropdown ? (
          <img src={arrow_up} alt="arrow up" className="arrow-image"></img>
        ) : (
          <img src={arrow_down} alt="arrow down" className="arrow-image"></img>
        )}
        <div className="active-currency">{this.props.activeCurrencySymbol}</div>
        {this.displayCurrencyOptions()}
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
