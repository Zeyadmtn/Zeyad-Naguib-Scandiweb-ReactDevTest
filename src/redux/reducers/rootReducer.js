import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import selectProductReducer from './selectProductReducer';
import activeCategoryReducer from './activeCategoryReducer';
import activeCurrencyReducer from './activeCurrencyReducer';


const rootReducer = combineReducers({

    fetchReducer: fetchReducer,
    selectProductReducer: selectProductReducer,
    activeCategoryReducer: activeCategoryReducer,
    activeCurrencyReducer: activeCurrencyReducer
});


export default rootReducer;