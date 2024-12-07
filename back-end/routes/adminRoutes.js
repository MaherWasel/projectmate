const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

router.route("/home").get(authController.adminProtect, adminController.getData);
router
  .route("/stats")
  .get(authController.adminProtect, adminController.getData);
router
  .route("/stats/generate")
  .get(authController.adminProtect, adminController.generatePDF);
router
  .route("/users")
  .get(authController.adminProtect, adminController.getUsersData);
router
  .route("/users/:id/ban")
  .get(authController.adminProtect, adminController.banUser);
router
  .route("/users/:id/unban")
  .get(authController.adminProtect, adminController.unBanUser);
router
  .route("/reports")
  .get(authController.adminProtect, adminController.getReports);
router
  .route("/reports/:id")
  .delete(authController.adminProtect, adminController.discardReport);

router
  .route("/projects/:id")
  .delete(authController.adminProtect, adminController.deleteProject);

module.exports = router;
