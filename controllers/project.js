const HttpError = require("../models/http-error");

const projectSchema = require("../models/project");

//read
const getProjectData = async (req, res, next) => {
  let projectData;
  try {
    projectData = await projectSchema.find({});
  } catch (err) {
    return next(new HttpError("Could not find any project", 404));
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.json(projectData);
};

exports.getProjectData = getProjectData;
