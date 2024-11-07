const express = require('express');
const router = express.Router();
const Competitor = require('../models/Competitor');

router.get('/', async (req, res) => {
    const competitors = await Competitor.find();
    const yourMetrics = {
        traffic: 1000,    // Example data; replace with actual metrics
        backlinks: 200,
        keywords: 150,
    };

    res.send({ yourMetrics, competitors });
});

module.exports = router;
