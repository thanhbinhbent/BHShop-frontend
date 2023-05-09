import {
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    UPDATE_TOTAL_PRICE,
    REMOVE_FROM_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from './types';

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId,
    };
};

export const updateCartItem = (id, quantity) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_ITEM,
        payload: { id, quantity },
    });

    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
};
export const updateQuantity = (productId, quantity) => ({
    type: 'UPDATE_QUANTITY',
    payload: {
        productId,
        quantity,
    },
});
export const updateTotalPrice = () => (dispatch, getState) => {
    const { cartItems } = getState().cart;
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    dispatch({ type: UPDATE_TOTAL_PRICE, payload: totalPrice });
};
