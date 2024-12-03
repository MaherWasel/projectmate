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
  startDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  requirements: {
    type: [String],
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A project must have at least one requirement",
    },
  },
  majors: {
    type: [String],
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A project must have at least one major",
    },
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isLeader: Boolean,

  maxMembers: { type: Number, default: 5 },
  joinRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "JoinRequest",
    },
  ],
});

projectSchema.methods.isLeaderFor = function (userId) {
  return this.leader.equals(userId);
};

module.exports = mongoose.model("Project", projectSchema);
