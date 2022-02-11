import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import selectProductReducer from './selectProductReducer';
import activeCategoryReducer from './activeCategoryReducer';
import activeCurrencyReducer from './activeCurrencyReducer';
import cartReducer from './cartReducer';
import changeAtrReducer from './changeAtrReducer';


const rootReducer = combineReducers({

    fetchReducer: fetchReducer,
    selectProductReducer: selectProductReducer,
    activeCategoryReducer: activeCategoryReducer,
    activeCurrencyReducer: activeCurrencyReducer,
    cartReducer: cartReducer,
    changeAtrReducer: changeAtrReducer
});


export default rootReducer;