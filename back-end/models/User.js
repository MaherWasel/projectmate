const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        // unique: true
    },
    image: ImageSchema

});

module.exports = mongoose.model("User", userSchema);