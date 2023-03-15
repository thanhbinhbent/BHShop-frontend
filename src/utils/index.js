module.exports = {
    handleMoney: function (value) {
        return new Intl.NumberFormat().format(value) + '₫';
    },
    nameValidator: (_, value) => {
        if (!/^[^\d]+$/.test(value)) {
            return Promise.reject(new Error('Họ và tên không được có ký tự số'));
        }
        return Promise.resolve();
    },
    phoneValidator: (_, value) => {
        if (!value || /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Số điện thoại phải là số và đủ 10 ký tự!'));
    },

    emailValidator: (_, value) => {
        if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Email không đúng định dạng!'));
    },
    passwordValidator: (_, value) => {
        if (value && value.length >= 8 && /[A-Z]/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(
            new Error('Mật khẩu phải ít nhất 8 ký tự và có ít nhất 1 ký tự hoa'),
        );
    },
};
