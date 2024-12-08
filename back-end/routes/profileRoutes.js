const express = require("express");
const router = express.Router();
const profile = require("../controllers/profileController");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const authController = require("../controllers/authController");
const reportController = require("../controllers/reportController");
router
  .route("/:username")
  .get(authController.protect, profile.getUser)
  .post(authController.protect, upload.single("image"), profile.updateUser);

router
  .route("/:username/projects")
  .get(authController.protect, profile.getUserProjects);

router
  .route("/:username/report")
  .post(authController.protect, reportController.reportUser);

module.exports = router;
