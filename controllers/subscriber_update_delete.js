const Subscriber = require("../models/subscriber");

exports.updatesubscriber = exports.updateSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = await Subscriber.findByIdAndUpdate(
            req.params.id,
            { email },
            { new: true }
        );
        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }
        res.json({ message: "Subscriber updated successfully", subscriber });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletesubscriber = exports.deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }
        res.json({ message: "Subscriber deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
