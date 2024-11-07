// models/Competitor.js
const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema({
    name: String,
    traffic: Number,
    backlinks: Number,
    keywords: Number,
    timestamp: Date,
});

module.exports = mongoose.model('Competitor', competitorSchema);
