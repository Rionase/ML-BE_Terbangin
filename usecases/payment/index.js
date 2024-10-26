const paymentRepo = require("../../repositories/payment/index");
const midtrans = require("./midtrans");
const HttpError = require("../../utils/HttpError");
const { PaymentStatus } = require("../../utils/constants");
const { v4: uuidv4 } = require("uuid");

exports.getPaymentById = async (id, user) => {
    const data = await paymentRepo.getPaymentById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with ID ${id} does not exist!`,
        });
    }
    // cek kalo payment dengan ID tsb. memang milik user yg bersangkutan
    if (data.userId !== user.id) {
        throw new HttpError({
            statusCode: 403,
            message: "Not allowed to access other user's payment(s)!",
        });
    }
    return data;
};

exports.getPaymentsByUserId = async (userId, user) => {
    if (userId !== user.id) {
        throw new HttpError({
            statusCode: 403,
            message: "Not allowed to access other user's payment(s)!",
        });
    }
    const data = await paymentRepo.getPaymentsByUserId(userId);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with user ID ${userId} does not exist!`,
        });
    }
    return data;
};

exports.addPayment = async (payload) => {
    const { totalPrice, user } = payload;

    if (!totalPrice) {
        throw new HttpError({
            statusCode: 400,
            message: "Field totalPrice must be filled!",
        });
    }
    let modifiedPayload = {
        ...payload,
        id: uuidv4(),
        userId: user.id,
    };
    const midtransPayment = await midtrans.generateMidtransTransaction(
        modifiedPayload
    );
    const { token: snapToken, redirect_url: snapLink } = midtransPayment;
    modifiedPayload = { ...modifiedPayload, snapToken, snapLink };

    return paymentRepo.addPayment(modifiedPayload);
};

exports.updatePaymentById = async (id, payload) => {
    const {
        user,
        transaction_status: transactionStatus,
        payment_type: method,
    } = payload;
    const toBeUpdated = await this.getPaymentById(id, user);

    // payment yg statusnya issued atau cancelled udah ga bisa di-update lagi
    if (toBeUpdated.status !== PaymentStatus.UNPAID) {
        return toBeUpdated;
    }
    let modifiedPayload = { ...payload };
    delete modifiedPayload.user; // delete the no longer used user data for payload

    if (transactionStatus) {
        const paymentStatus =
            midtrans.getPaymentStatusFromTransactionStatus(transactionStatus);
        modifiedPayload = { ...modifiedPayload, status: paymentStatus };
    }
    if (method) {
        modifiedPayload = { ...modifiedPayload, method };
    }
    modifiedPayload = { ...modifiedPayload, updatedAt: new Date() };

    return paymentRepo.updatePaymentById(id, modifiedPayload);
};

exports.deletePaymentById = async (id, user) => {
    const toBeDeleted = await this.getPaymentById(id, user);
    await paymentRepo.deletePaymentById(id);
    return toBeDeleted;
};
