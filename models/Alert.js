// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    userId: String,
    metric: String,
    threshold: Number,
    alertType: String,
    timestamp: Date,
});

module.exports = mongoose.model('Alert', alertSchema);
