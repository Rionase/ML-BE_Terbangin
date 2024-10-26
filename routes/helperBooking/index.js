const express = require("express");
const router = express.Router();
const helperBookingController = require("../../controllers/helperBooking");

router.post("/", helperBookingController.createHelperBooking);

router
  .route("/:id")
  .get(helperBookingController.getHelperBookingById)
  .put(helperBookingController.updateHelperBooking)
  .delete(helperBookingController.deleteHelperBookingById);

router
  .route("/passanger/:passangerId")
  .get(helperBookingController.getHelperBookingByPassangerId)
  .delete(helperBookingController.deleteHelperBookingByPassangerId);

router
  .route("/booking/:bookingId")
  .get(helperBookingController.getHelperBookingByBookingId)
  .delete(helperBookingController.deleteHelperBookingByBookingId);

router
  .route("/seat/:seatId")
  .get(helperBookingController.getHelperBookingBySeatId)
  .delete(helperBookingController.deleteHelperBookingBySeatId);

router
  .route("/user/:userId")
  .get(helperBookingController.getHelperBookingByUserId);


module.exports = router;
