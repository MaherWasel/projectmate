const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  requirements: [String],
  majors: [String],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  maxMembers: { type: Number, default: 5 },
  
});

module.exports = mongoose.model("Project", projectSchema);