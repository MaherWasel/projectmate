const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    description: String,
    date: Date,
    status: String,
    type: String,
});

module.exports = mongoose.model("Report", reportSchema);