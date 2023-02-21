module.exports = {
    handleMoney: function (value) {
        return value.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
        });
    },
};
