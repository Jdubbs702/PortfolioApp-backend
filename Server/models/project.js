const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  sectionId: { type: String },
  projectName: { type: String },
  description: { type: String },
  projectLink: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
