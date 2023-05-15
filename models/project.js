const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  sectionId: { type: String },
  projectName: { type: String },
  description: { type: String },
  projectLink: { type: String },
  image: { type: String },
  index: { type: String },
});

module.exports = mongoose.connection.useDb("portfolio", { useCache: true }).model('Project', projectSchema);
