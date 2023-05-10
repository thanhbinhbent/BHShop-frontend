import {
    SET_LOGGED_IN,
    SET_USER,
    SET_USER_FIRST_NAME,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    SET_WISHLIST,
} from '../actions/userActions';

const initialState = {
    isLoggedIn: false,
    user: {},
    wishListItems: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_USER_FIRST_NAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    first_name: action.payload,
                },
            };
        case SET_WISHLIST:
            return {
                ...state,
                wishListItems: action.payload,
            };
        case ADD_TO_WISHLIST:
            let payload = action.payload;
            let index = state.wishListItems.findIndex(
                (x) => x._id === payload._id,
            );
            console.log(index);
            if (index == -1) {
                return {
                    ...state,
                    wishListItems: [...state.wishListItems, { ...payload }],
                };
            } else {
                return state;
            }
        case REMOVE_FROM_WISHLIST:
            const productIndex = action.payload;
            const changedWishListItems = state.wishListItems.filter(
                (item) => item._id !== productIndex,
            );
            return {
                ...state,
                wishListItems: changedWishListItems,
            };
        default:
            return state;
    }
}
