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
        // the array is not empty and does not contain empty strings
        return (
          value &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0)
        );
      },
      message: "A project must have at least one requirement",
    },
  },

  majors: {
    type: [String],
    validate: {
      validator: function (value) {
        return (
          value &&
          value.length > 0 &&
          value.every((item) => item.trim().length > 0)
        );
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

  // we do not need this here. it will be done by the server
  // we can attach it to the object when we send it to the client
  // title|description|startDate|requirements|majors|members|status|leader|(isLeader), it does not make sense to store it in the object.
  isLeader: Boolean,

  maxMembers: { type: Number, default: 5 },
  joinRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "JoinRequest",
    },
  ],
});

// we do not need this here. move it to utils
projectSchema.methods.isLeaderFor = function (userId) {
  return this.leader.equals(mongoose.Types.ObjectId(userId));
};

module.exports = mongoose.model("Project", projectSchema);
