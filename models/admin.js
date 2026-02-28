const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Stored as a bcrypt hash
});
module.exports = mongoose.model('Admin', adminSchema);