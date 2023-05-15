const ProjectModel = require("../models/project");
const HttpError = require("../models/http-error");

//read
const getProjectData = async (req, res, next) => {
  let projectData;
  try {
    projectData = await ProjectModel.find({});
  } catch (err) {
    return next(new HttpError("Could not find any project", 404));
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.json(projectData);
};

exports.getProjectData = getProjectData;
