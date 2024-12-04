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
