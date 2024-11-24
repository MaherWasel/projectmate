const Project = require("../models/Project");
const APIFeatures = require("../utils/APIFeaturs");
const filterObject = require("../utils/filterObject");
exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        project: newProject,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query).filter();
    const projects = await features.query;

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports.getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("members");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
  }
};
