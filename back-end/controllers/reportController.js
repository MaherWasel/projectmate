const Report = require("../models/Report");
const Project = require("../models/Project");
const User = require("../models/User");
module.exports.reportProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { description } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Description is required and must be a valid string",
      });
    }

    const report = new Report({
      project: projectId,

      description: description.trim(),
      date: new Date(),
      status: "Pending",
      type: "project",
    });

    await report.save();

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Error reporting project:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while reporting the project",
    });
  }
};

module.exports.reportUser = async (req, res) => {
  try {
    const username = req.params.username;
    const { description } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Description is required and must be a valid string",
      });
    }

    const report = new Report({
      userid: user._id,
      description: description.trim(),
      date: new Date(),
      status: "Pending",
      type: "user",
    });

    await report.save();

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Error reporting project:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while reporting the project",
    });
  }
};
