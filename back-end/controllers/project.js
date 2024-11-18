const Project = require('../models/Project');

module.exports.getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id).populate('members');
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
};