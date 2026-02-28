const Client = require("../models/client");

exports.getclients = exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addclient = exports.addClient = async (req, res) => {
    try {
        let imageUrl = "";
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newClient = new Client({
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
            image: imageUrl,
        });

        await newClient.save();
        res.status(201).json({ message: "Client added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
