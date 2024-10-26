const express = require("express");
const router = express.Router();
const testingController = require("../../controllers/testing");

router.route("/insert-seats").get(testingController.insertSeat)

module.exports = router;