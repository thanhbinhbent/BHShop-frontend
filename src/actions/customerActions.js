export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_CUSTOMER_ADDRESSES = 'SET_CUSTOMER_ADDRESSES';

export const setCustomer = (customer) => {
    return {
        type: SET_CUSTOMER,
        payload: customer,
    };
};

export const setCustomerAddresses = (addresses) => {
    return {
        type: SET_CUSTOMER_ADDRESSES,
        payload: addresses,
    };
};
