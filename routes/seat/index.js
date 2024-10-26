const express = require("express");
const router = express.Router();
const seatController = require("../../controllers/seat");

router
  .route("/seat-with-flight-id/:id") 
  .get(seatController.getSeatbyFlight)
  .delete(seatController.deleteSeatbyFlight)

router
  .route("/")
  .get(seatController.getSeats)
  .post(seatController.createSeat);

router
  .route("/id/:id")
  .get(seatController.getSeatbyId)
  .put(seatController.updateSeat)
  .delete(seatController.deleteSeat);

module.exports = router;
