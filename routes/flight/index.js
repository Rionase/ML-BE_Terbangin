const express = require("express");
const router = express.Router();
const flightController = require("../../controllers/flight");

router.patch(
  "/decrementcapacity/:id",
  flightController.decrementFlightCapacity
);
router.get("/flightfilter", flightController.getFlightsbyFilter);

router
  .route("/")
  .get(flightController.getFlights)
  .post(flightController.createFlight);

router
  .route("/id/:id")
  .get(flightController.getFlightbyId)
  .put(flightController.updateFlight)
  .delete(flightController.deleteFlight);

router.route("/continent").get(flightController.getFlightsbyContinent);

module.exports = router;
