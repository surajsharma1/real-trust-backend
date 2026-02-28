const mongoose = require('mongoose');

const projectschema = new mongoose.Schema({
    image : String,
    name : String,
    description : String,
}, { timeseriestamps : true });

module.exports = mongoose.model('Project', projectschema);