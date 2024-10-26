const { Payments } = require("../../models");

exports.getPaymentById = async (id) => {
    return Payments.findByPk(id);
};

exports.getPaymentsByUserId = async (userId) => {
    return Payments.findAll({ where: { userId } });
};

exports.addPayment = async (payload) => {
    return Payments.create(payload);
};

exports.updatePaymentById = async (id, payload) => {
    const updateCount = await Payments.update(payload, { where: { id } });

    if (updateCount > 0) {
        return Payments.findByPk(id);
    }
    return null;
};

exports.deletePaymentById = async (id) => {
    return Payments.destroy({ where: { id } });
};
