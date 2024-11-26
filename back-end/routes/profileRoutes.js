const express = require("express");
const router = express.Router();
const profile = require("../controllers/profileController");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/:username")
  .get(profile.getUser)
  .post(upload.single("image"), profile.updateUser);

module.exports = router;
