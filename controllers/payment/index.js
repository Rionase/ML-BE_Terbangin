const paymentUsecase = require("../../usecases/payment/index");

exports.getPaymentById = async (req, res, next) => {
    try {
        const paymentId = req?.params?.id;
        const user = req?.user;
        const data = await paymentUsecase.getPaymentById(paymentId, user);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.getPaymentsByUserId = async (req, res, next) => {
    try {
        const userId = req?.params?.userId;
        const user = req?.user;
        const data = await paymentUsecase.getPaymentsByUserId(userId, user);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.addPayment = async (req, res, next) => {
    try {
        const user = req?.user;
        const payload = { ...req?.body, user };
        const data = await paymentUsecase.addPayment(payload);

        return res.status(201).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.updatePaymentById = async (req, res, next) => {
    try {
        const paymentId = req?.params?.id;
        const user = req?.user;
        const payload = { ...req?.body, user };
        const data = await paymentUsecase.updatePaymentById(paymentId, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
}

exports.deletePaymentById = async (req, res, next) => {
    try {
        const paymentId = req?.params?.id;
        const user = req?.user;
        const data = await paymentUsecase.deletePaymentById(paymentId, user);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};
