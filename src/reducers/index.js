import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
});

export default rootReducer;
