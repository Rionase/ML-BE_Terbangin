const express = require("express");
const router = express.Router();
const passangerController = require("../../controllers/passanger");

router.post("/", passangerController.createPassanger);
router
    .route("/:id")
    .get(passangerController.getPassangerById)
    .put(passangerController.updatePassanger)
    .delete(passangerController.deletePassanger);

router
    .route("/user/:userId")
    .get(passangerController.getPassangerByUserId)
    .delete(passangerController.deletePassangerByUserId);

module.exports = router;
