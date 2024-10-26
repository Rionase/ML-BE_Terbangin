const express = require("express");
const router = express.Router();
const airlineController = require("../../controllers/airline");

router
  .route("/")
  .get(airlineController.getAirlines)
  .post(airlineController.createAirline);

router
  .route("/:id")
  .get(airlineController.getAirline)
  .put(airlineController.updateAirline)
  .delete(airlineController.deleteAirline);

module.exports = router;
