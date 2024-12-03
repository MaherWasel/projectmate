const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invitataionSchema = new Schema({
  username: {
    type: String,
    required: [true, "An invite must have the username of the recipient"],
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "The project id is required"],
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Invitation", invitataionSchema);
