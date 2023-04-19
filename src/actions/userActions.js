export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';

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