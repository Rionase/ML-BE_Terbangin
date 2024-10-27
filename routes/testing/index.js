const express = require("express");
const router = express.Router();
const testingController = require("../../controllers/testing");

router.route("/insert-seats").get(testingController.insertSeat)
router.route("/available-flights").get(testingController.getAvailableFlight)

module.exports = router;