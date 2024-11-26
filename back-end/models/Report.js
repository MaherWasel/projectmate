const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    description: String,
    date: Date,
    status: String,
});

module.exports = mongoose.model("Report", reportSchema);