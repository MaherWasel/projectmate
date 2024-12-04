const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const inviteController = require("../controllers/inviteController");

router
  .route("/")
  .post(authController.protect, inviteController.createInvitation)
  .get(authController.protect, inviteController.getInvites);
router
  .route("/:id")
  .patch(authController.protect, inviteController.handleInvitation);
module.exports = router;
