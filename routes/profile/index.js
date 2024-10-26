const router = require("express").Router();
const profileController = require("../../controllers/profile");
const { authMiddleware } = require("../../middlewares/auth");

router
    .route("/id/:id")
    .all(authMiddleware)
    .get(profileController.getProfileById)
    .patch(profileController.updateProfileById)
    .delete(profileController.deleteProfileById);

router.get("/email/:email", profileController.getProfileByEmail);
router.get("/phone/:phoneNumber", profileController.getProfileByPhoneNumber);

module.exports = router;
