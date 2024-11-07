const express = require('express');
const router = express.Router();

router.post('/track-behavior', (req, res) => {
    broadcast({ message: 'User behavior updated', data: req.body });
    res.sendStatus(200);
});

module.exports = router;
