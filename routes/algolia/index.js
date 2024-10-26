const express = require("express");
const algoliaController = require("../../controllers/algolia");
const router = express.Router();

router.post("/sync-airports", algoliaController.syncAirports);

module.exports = router;
