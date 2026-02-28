const Subscriber = require("../models/subscriber");

exports.addSubscriber = async (req, res) => {
    try {
        // Prevent duplicate subscriptions
        const existing = await Subscriber.findOne({ email: req.body.email });
        if (existing) return res.status(400).json({ message: "Already subscribed" });

        const newSubscriber = new Subscriber({ email: req.body.email });
        await newSubscriber.save();
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
