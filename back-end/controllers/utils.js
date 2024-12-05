if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
module.exports.getImage = async (req, res) => {
    try {
        res.json(req.user.image.url);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err, url });
    }
};