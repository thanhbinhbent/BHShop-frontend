import {
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    UPDATE_QUANTITY,
    REMOVE_FROM_CART,
} from '../actions/types';

const initialState = {
    cartItems: [],
    cartTotal: 0,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find((x) => x.id === item.id);
            if (product) {
                return {
                    cartItems: state.cartItems.map((x) =>
                        x.id === product.id
                            ? { ...product, quantity: product.quantity + 1 }
                            : x,
                    ),
                };
            
            } else {
                return {
                    cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                };
            }
        case UPDATE_CART_ITEM:
            const { id, quantity } = action.payload;
            const updatedItems = state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity } : item,
            );
            const total = updatedItems.reduce(
                (accumulator, current) => accumulator + current.price * current.quantity,
                0,
            );
            return {
                ...state,
                cartItems: updatedItems,
                total,
            };
        case UPDATE_QUANTITY:
            // handle updating product quantity in cart
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item,
            );
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case REMOVE_FROM_CART:
            const productId = action.payload;
            const changedCartItems = state.cartItems.filter(
                (item) => item.id !== productId,
            );
            const changedTotalPrice = changedCartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0,
            );
            return {
                ...state,
                cartItems: changedCartItems,
                totalPrice: changedTotalPrice,
            };
        default:
            return state;
    }
}
