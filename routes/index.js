const router = require("express").Router();
const profileRoutes = require("./profile");
const passangerRoutes = require("./passanger");
const airlineRoutes = require("./airline");
const airportRoutes = require("./airport");
const authRoutes = require("./auth");
const flightRoutes = require("./flight");
const seatRoutes = require("./seat");
const helperBookingRoutes = require("./helperBooking");
const verificationRoutes = require("./verification");
const notificationRoutes = require("./notification");
const paymentRoutes = require("./payment");
const bookingRoutes = require("./booking");
const algoliaRoutes = require("./algolia");
const { authMiddleware } = require("../middlewares/auth");

router.use("/auth", authRoutes);

router.use("/profile", profileRoutes);

router.use("/passanger", authMiddleware, passangerRoutes);

router.use("/booking", authMiddleware, bookingRoutes);

router.use("/flight", flightRoutes);

router.use("/seat", seatRoutes);

router.use("/airline", airlineRoutes);

router.use("/airport", airportRoutes);

router.use("/helper-booking", authMiddleware, helperBookingRoutes);

router.use("/verification", verificationRoutes);

router.use("/notification", notificationRoutes);

router.use("/payment", paymentRoutes);

router.use("/algolia", algoliaRoutes);

module.exports = router;
