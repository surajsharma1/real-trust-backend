const Project = require("../models/project");
const cloudinary = require("../config/cloudinary");

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newProject = new Project({ name, description, image });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
