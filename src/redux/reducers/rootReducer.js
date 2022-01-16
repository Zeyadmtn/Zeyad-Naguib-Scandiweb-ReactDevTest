import { combineReducers } from 'redux';


const counterReducer = (state, action) => {
    return null;
}

const rootReducer = combineReducers({

    counter: counterReducer,

});


export default rootReducer;