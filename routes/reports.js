const express = require('express');
const router = express.Router();
const UserBehavior = require('../models/UserBehavior'); // Replace with actual UserBehavior schema

router.get('/', async (req, res) => {
    const { startDate, endDate, filters } = req.query;

    const reportData = await UserBehavior.aggregate([
        { $match: { timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
        { $group: { _id: '$utmSource', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
    ]);

    res.send(reportData);
});

module.exports = router;
