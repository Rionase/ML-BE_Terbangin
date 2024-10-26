const router = require("express").Router();
const paymentController = require("../../controllers/payment/index");
const midtransController = require("../../controllers/payment/midtrans");
const { authMiddleware } = require("../../middlewares/auth");

router.route("/").post(authMiddleware, paymentController.addPayment);
router
    .route("/id/:id")
    .get(authMiddleware, paymentController.getPaymentById)
    .delete(authMiddleware, paymentController.deletePaymentById)
    .patch(authMiddleware, paymentController.updatePaymentById);
router.get(
    "/userId/:userId",
    authMiddleware,
    paymentController.getPaymentsByUserId
);
router.post(
    "/midtrans/notification",
    midtransController.handleMidtransNotification
);

module.exports = router;
