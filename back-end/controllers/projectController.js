const Project = require("../models/Project");
const APIFeatures = require("../utils/APIFeaturs");
const filterObject = require("../utils/filterObject");
const RequestModel = require("../models/JoinRequest");
exports.createProject = async (req, res) => {
  try {
    req.body.leader = req.user;

    const newProject = await Project.create(req.body);
    res.status(201).json({
      success: true,

      record: newProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query).filter();
    const projects = await features.query;

    res.status(200).json({
      success: true,

      record: projects,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

module.exports.getProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    let project = await Project.findById(id).populate("members");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.isLeader = project.isLeaderFor(userId);
    res.status(200).json({
      success: true,
      record: project,
    });
  } catch (err) {
    res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
  }
};

module.exports.requestToJoin = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    // Find the project and populate joinRequests with actual request documents
    const project = await Project.findById(projectId).populate("joinRequests");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if the user has already submitted a join request
    const userAlreadyRequested = project.joinRequests.some(
      (request) => request.userId.toString() === userId
    );

    if (userAlreadyRequested) {
      return res.status(400).json({
        success: false,
        message: "You have already requested to join this project",
      });
    }

    // Create a new join request
    const joinRequest = await RequestModel.create({
      projectId,
      userId,
    });

    // Add the new join request to the project's joinRequests array
    project.joinRequests.push(joinRequest._id);
    await project.save();

    res.status(201).json({
      success: true,
      message: "Request to join successfully created and added to project",
      record: joinRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.message,
    });
  }
};

module.exports.getJoinRequests = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId).populate("joinRequests");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      joinRequests: project.joinRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};
