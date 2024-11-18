if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.getImage = async (req, res) => {
    const token = req.cookies.authToken;
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded._id);
            res.json(user.image.url);
        }
        else res.json("https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg");
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
};