const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const reportController = require("../controllers/reportController");
router
  .route("/")
  .get(projectController.getAllProjects)
  .post(authController.protect, projectController.createProject);
router
  .route("/:id")
  .get(authController.protect, projectController.getProject)
  .patch(authController.protect, projectController.updateProject);

router
  .route("/:id/joinRequests")
  .post(authController.protect, projectController.requestToJoin)
  .get(authController.protect, projectController.getJoinRequests)
  .patch(authController.protect, projectController.acceptJoinRequest);

router
  .route("/:id/report")
  .post(authController.protect, reportController.reportProject);

module.exports = router;
