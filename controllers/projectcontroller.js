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
        const { name, description } = req.body;
        let imageUrl = "";
        
        // If a new image is uploaded, process it with Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                width: 450,
                height: 350,
                crop: "fill",
            });
            imageUrl = result.secure_url;
        }

        const newProject = new Project({ 
            name, 
            description, 
            image: imageUrl 
        });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
