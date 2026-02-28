const Project = require("../models/project");
const cloudinary = require("../config/cloudinary");

exports.updateproject = exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    let updateData = { name, description };

    // If a new image is uploaded, process it
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        width: 450,
        height: 350,
        crop: "fill",
      });
      updateData.image = result.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteproject = exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
