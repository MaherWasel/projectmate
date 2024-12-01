const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const requestSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("JoinRequest", requestSchema);
