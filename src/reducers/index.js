import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    customer: customerReducer
});

export default rootReducer;
