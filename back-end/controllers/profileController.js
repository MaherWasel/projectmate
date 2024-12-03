if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.getUser = async (req, res) => {
  const { username } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ username });
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
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
  }
};

// app.post("/profile/:username", upload.single('image'),
module.exports.updateUser = async (req, res) => {
  const { links, bio } = req.body;
  const { username } = req.params;
  const token = req.cookies.authToken;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded._id == user._id) {
        console.log("Updating user profile");

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
          .json({ message: "Profile updated successfully" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Unexpected Error Occurred", error: err });
  }
};
