import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';


const rootReducer = combineReducers({

    fetchReducer: fetchReducer

});


export default rootReducer;