// models/SuspiciousActivity.js
const mongoose = require('mongoose');

const suspiciousActivitySchema = new mongoose.Schema({
    ip: String,
    requestBody: String,
    requestParams: String,
    requestQuery: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SuspiciousActivity', suspiciousActivitySchema);
