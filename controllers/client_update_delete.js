const Client = require("../models/client");

exports.updateclient = exports.updateClient = async (req, res) => {
    try {
        const { name, designation, description } = req.body;
        const updateData = { name, designation, description };
        
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.json({ message: "Client updated successfully", client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteclient = exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
