const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
});

module.exports = mongoose.model("Project", projectSchema);