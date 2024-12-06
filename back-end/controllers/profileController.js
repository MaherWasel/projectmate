if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Project = require("../models/Project");

module.exports.getUser = async (req, res) => {
  const { username } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ username }, "-password");
    const userObj = user.toObject();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (userId == user._id) {
      userObj.isOwner = true;
    } else {
      userObj.isOwner = false;
    }
    res.status(200).json({ success: true, record: userObj });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unexpected Error Ocurred", error: error.message });
  }
};

// app.post("/profile/:username", upload.single('image'),
module.exports.updateUser = async (req, res) => {
  const { links, bio } = req.body;
  const { username } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ username });
    const isOwner = userId === user._id.toString();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (isOwner) {
      // Prepare data to update
      const updateData = { bio };

      // Handle 'links' - if not provided, null or undefined, set to empty array
      if (links) {
        updateData.links = links
          .split(",")
          .map((link) => link.trim())
          .filter((link) => link !== "");
      } else {
        updateData.links = []; // Set to empty array if no links provided
      }

      // If a file (image) is uploaded, update the image field as was
      if (req.file) {
        updateData.image = {
          url: req.file.path,
          filename: req.file.filename,
        };
      }

      // Update user in the database
      await user.updateOne(updateData);
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Profile updated successfully" });
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.message,
    });
  }
};

module.exports.getUserProjects = async (req, res) => {
  const userId = req.user.id;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find all projects where the user is a member or leader
    const projects = await Project.find({ members: user._id });
    if (userId !== user._id.toString()) {
      return res
        .status(200)
        .json({ success: true, projects: { ...projects, isOwner: false }, message: "User Projects are fetched successfully" });
    }
    return res
      .status(200)
      .json({ success: true, projects: { ...projects, isOwner: true }, message: "User Projects are fetched successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Error Occurred",
      error: error.message,
    });
  }
}