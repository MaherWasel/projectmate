const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, "Project name is required"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  startDate: Date,
  requirements: {
    type: [String],
    required: [true, "A project must have at least one requirement"],
  },
  majors: {
    type: [String],
    required: [true, "A project must have at least one major"],
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: [this.leader],
    },
  ],
  status: {
    type: String,
    enum: {
      values: ["Not Started", "In Progress", "Finished"],
      message: "Status is either:  Not Started, In Progress, Finished",
    },
    default: "Not Started",
  },
  maxMembers: { type: Number, default: 5 },
});

module.exports = mongoose.model("Project", projectSchema);
