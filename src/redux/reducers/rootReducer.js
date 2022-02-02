import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import selectProductReducer from './selectProductReducer';


const rootReducer = combineReducers({

    fetchReducer: fetchReducer,
    selectProductReducer: selectProductReducer

});


export default rootReducer;