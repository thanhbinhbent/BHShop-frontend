module.exports = {
    handleMoney: function (value) {
        return new Intl.NumberFormat().format(value) + '₫';
    },
};
