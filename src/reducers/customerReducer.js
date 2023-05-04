import { SET_CUSTOMER, SET_CUSTOMER_ADDRESSES } from '../actions/customerActions';


const initialState = {
    customer: {},
};

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
            };
        case SET_CUSTOMER_ADDRESSES:
            return {
                ...state,
                customer: {
                    ...state.customer,
                    addresses: action.payload,
                },
            };
        default:
            return state;
    }
}
