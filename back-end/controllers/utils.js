if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const User = require('../models/User');

module.exports.getImage = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        res.json(user.image.url);
    } catch (err) {
        const url = "https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg";
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err, url });
    }
};