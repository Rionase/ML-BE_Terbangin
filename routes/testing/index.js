const express = require("express");
const router = express.Router();
const testingController = require("../../controllers/testing");
const { nonAuthMiddleware } = require("../../middlewares/nonAuth");

router.route("/insert-seats").get(testingController.insertSeat)
router.route("/available-flights").get(testingController.getAvailableFlight)
router.route("/recomendation").get(nonAuthMiddleware, testingController.recomendation)

module.exports = router;