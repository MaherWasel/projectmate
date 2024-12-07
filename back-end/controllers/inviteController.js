const Invitation = require("../models/Invitation");
const Project = require("../models/Project");
const User = require("../models/User");

module.exports.createInvitation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { project: projectId, username } = req.body;

    if (!projectId || !username) {
      return res.status(400).json({
        success: false,
        message: "Project ID and username are required",
      });
    }
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    if (!project.leader.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only the project leader can send invitations",
      });
    }
    if (project.members.length >= project.maxMembers) {
      return res.status(400).json({
        success: false,
        message: "Maximum number of members reached for this project",
      });
    }

    const userToInvite = await User.findOne({ username });

    if (!userToInvite) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userToInvite._id.equals(userId)) {
      return res.status(400).json({
        success: false,
        message: "You cannot invite yourself to the project",
      });
    }
    if (project.members.includes(userToInvite._id)) {
      return res.status(400).json({
        success: false,
        message: "The user is already a member of the project",
      });
    }

    const existingInvitation = await Invitation.findOne({
      project: projectId,
      username: username,
    });
    if (existingInvitation) {
      return res.status(400).json({
        success: false,
        message: "An invitation for this user to this project already exists",
      });
    }

    const invitation = await Invitation.create({
      senderId: userId,
      project: projectId,
      username: username,
    });
    res.status(201).json({
      success: true,
      record: invitation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.name,
    });
  }
};

module.exports.getInvites = async (req, res) => {
  try {
    const username = req.user.username;

    const invites = await Invitation.find({ username }).populate("project");
    res.status(200).json({
      success: true,
      record: invites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.name,
    });
  }
};

module.exports.handleInvitation = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;
    const invitationId = req.params.id;
    const accept = req.body.accept;

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found",
      });
    }
    if (username !== invitation.username) {
      return res.status(400).json({
        success: false,
        message: "You are not the recipient of the invitation",
      });
    }

    if (accept === true) {
      const projectId = invitation.project;
      const project = await Project.findById(projectId);
      // if the project got deleted
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      // if somehow the user is already in the project
      if (project.members.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "You are already a member of this project",
        });
      }

      if (project.members.length >= project.maxMembers) {
        return res.status(400).json({
          success: false,
          message: "Project has reached the maximum number of members",
        });
      }

      project.members.push(userId);
      await project.save();

      return res.status(200).json({
        success: true,
        message: "You have successfully joined the project",
      });
    }

    await Invitation.findByIdAndDelete(invitationId);

    res.status(200).json({
      success: true,
      message: "Invitation declined",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};
