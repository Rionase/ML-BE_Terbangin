const PaymentStatus = {
    ISSUED: "ISSUED",
    UNPAID: "UNPAID",
    CANCELLED: "CANCELLED",
};
const clientUrl = process.env.CLIENT_URL;
const Midtrans = {
    SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    TRANSACTION_SANDBOX_API: process.env.MIDTRANS_TRANSACTION_SANDBOX_API,
    INVOICE_SANDBOX_API: process.env.MIDTRANS_INVOICE_SANDBOX_API,
};

module.exports = { PaymentStatus, clientUrl, Midtrans };
