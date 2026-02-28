const Contact = require("../models/contact");

exports.updatecontact = exports.updateContact = async (req, res) => {
    try {
        const { fullname, email, mobile, city } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { fullname, email, mobile, city },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact updated successfully", contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletecontact = exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
