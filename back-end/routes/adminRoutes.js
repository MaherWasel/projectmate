const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router
  .route("/home")
  .get(adminController.getData);
router
  .route("/stats")
  .get(adminController.getData)
router.
    route("/stats/generate").get(adminController.generatePDF);
router
    .route("/users")
    .get(adminController.getUsersData);

router.route("/users/:id/ban").get(adminController.banUser);
router.route("/users/:id/unban").get(adminController.unBanUser);


module.exports = router;