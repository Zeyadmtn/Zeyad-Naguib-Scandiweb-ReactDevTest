import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import selectProductReducer from './selectProductReducer';
import activeCategoryReducer from './activeCategoryReducer';


const rootReducer = combineReducers({

    fetchReducer: fetchReducer,
    selectProductReducer: selectProductReducer,
    activeCategoryReducer: activeCategoryReducer
});


export default rootReducer;