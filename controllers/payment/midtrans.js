const midtransUsecase = require("../../usecases/payment/midtrans");

exports.handleMidtransNotification = async (req, res, next) => {
    try {
        const payload = req?.body;

        const data = await midtransUsecase.handleMidtransNotification(
            payload,
            req
        );

        req.io.emit("notificationUpdate", {
            message: "Notification Update",
        });

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};
