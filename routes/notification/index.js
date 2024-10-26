const express = require("express");
const router = express.Router();
const NotificationController = require("../../controllers/notification");
const { authMiddleware } = require("../../middlewares/auth");

router.use(authMiddleware);

router
.route("/")
.get(NotificationController.getNotifications)
.post(NotificationController.createNotification);

router
.route("/:id")
.get(NotificationController.getNotification)
.put(NotificationController.updateNotification)
.delete(NotificationController.deleteNotification);

router.put("/:id/read", NotificationController.readNotification);

router.get("/user/:userId", NotificationController.getNotificationByUserId);
router.get("/booking/:bookingId", NotificationController.getNotificationByBookingId);
router.put("/user/:userId", NotificationController.updateNotificationsByUserId);

module.exports = router;
