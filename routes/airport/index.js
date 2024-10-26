const express = require("express");
const router = express.Router();
const airportController = require("../../controllers/airport");

router
  .route("/")
  .get(airportController.getAirports)
  .post(airportController.createAirport);

router
  .route("/:id")
  .get(airportController.getAirport)
  .put(airportController.updateAirport)
  .delete(airportController.deleteAirport);

module.exports = router;
