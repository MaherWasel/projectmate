const Project = require("../models/Project");
const APIFeatures = require("../utils/APIFeaturs");
const filterObject = require("../utils/filterObject");
const RequestModel = require("../models/JoinRequest");
const User = require("../models/User");
exports.createProject = async (req, res) => {
  try {
    req.body.leader = req.user;
    if (!req.body.members) {
      req.body.members = req.user;
    }
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
    let project = await Project.findById(id)
      .populate("members")
      .populate("joinRequests");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Enable the isLeader property on the project object
    project = project.toObject();
    project.isLeader = project.leader._id == userId;
    project.isFull = project.members.length >= project.maxMembers;

    // This only causes bugs (literally a whole world of bugs), if you want to use it, check if it works
    // a better approach is to add to utils functions
    // project.isLeader = Project.isLeaderFor(userId);

    res.status(200).json({
      success: true,
      record: project,
    });
  } catch (err) {
    console.log("Error fetching");
    res.status(500).json({ message: "Unexpected Error Occurred", error: err });
  }
};

module.exports.requestToJoin = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    const { message } = req.body;

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
      message,
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
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.name,
    });
  }
};

module.exports.getJoinRequests = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId).populate({
      path: "joinRequests",
      populate: {
        path: "userId",
        select: "username image",
        // Only select the username field
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    //exculde the userId field
    const joinRequestsWithUsernames = project.joinRequests.map((request) => {
      const { userId, ...rest } = request._doc;
      return {
        ...rest,
        user: userId.username,
        image: userId.image.url,
      };
    });

    res.status(200).json({
      success: true,
      joinRequests: joinRequestsWithUsernames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};

module.exports.acceptJoinRequest = async (req, res) => {
  try {
    const projectId = req.params.id;
    const usernameToAccept = req.body.username;
    const currentUserId = req.user.id;
    const userToAccept = await User.findOne({ username: usernameToAccept });
    const userIdToAccept = userToAccept._id;
    const project = await Project.findById(projectId).populate("joinRequests");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // check if the current user is the leader of the project
    if (!project.leader.equals(currentUserId)) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to accept join requests for this project",
      });
    }

    // check if the user to be added exists in the joinRequests
    const requestToAccept = project.joinRequests.find((request) => {
      return request.userId.toString() === userIdToAccept.toString();
    });

    if (!requestToAccept) {
      return res.status(404).json({
        success: false,
        message: "Join request not found for this user",
      });
    }

    // check if the project has reached the maximum number of members
    if (project.members.length >= project.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "Cannot accept request, maximum members limit reached",
      });
    }

    // Add the user to the project's members list
    project.members.push(userIdToAccept);

    // Remove the join request from the project's joinRequests array
    project.joinRequests = project.joinRequests.filter(
      (request) => request._id !== requestToAccept._id
    );

    // Save the updated project
    await project.save();

    res.status(200).json({
      success: true,
      message: "User successfully added to the project",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};
