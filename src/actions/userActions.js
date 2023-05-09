export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const SET_WISHLIST = 'SET_WISHLIST';

export const setLoggedIn = (isLoggedIn) => {
    return {
        type: SET_LOGGED_IN,
        payload: isLoggedIn,
    };
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
}

export const setUserFirstName = (firstName) => {
    return {
        type: SET_USER_FIRST_NAME,
        payload: firstName,
    };
}

export const addToWishlist = (item) => {
    return {
        type: ADD_TO_WISHLIST,
        payload: item,
    };
}
export const removeFromWishlist = (productId) => {
    return {
        type: REMOVE_FROM_WISHLIST,
        payload: productId,
    };
}

export const setWishlist = (wishlist) => {
    return {
        type: SET_WISHLIST,
        payload: wishlist,
    };
}