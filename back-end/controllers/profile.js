if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.getUser = async (req, res) => {
    const { username } = req.params;
    const token = req.cookies.authToken;

    try {
        const user = await User.findOne({ username });
        const userObj = user.toObject();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._id == user._id) {
                userObj.isOwner = true;
            }
        }
        res.json(userObj);
    } catch (err) {
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

                // update user profile. discard empty links, images
                const updateData = { bio };
                if (links) {
                    // filter out empty links
                    updateData.links = links.split(',')
                        .filter(link => link.trim() !== '');;
                }
                if (req.file) {
                    updateData.image = { url: req.file.path, filename: req.file.filename };
                }
                await user.updateOne(updateData);
                await user.save();
            }
        }
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
};