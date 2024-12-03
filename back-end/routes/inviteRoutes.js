const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const inviteController = require("../controllers/inviteController");

router
  .route("/")
  .post(authController.protect, inviteController.createInvitation);

module.exports = router;
