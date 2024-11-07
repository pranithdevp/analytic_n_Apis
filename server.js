const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const intrusionDetection = require('./middleware/intrusionDetection');
const reportRoutes = require('./routes/reports');
const realTimeRoutes = require('./routes/realTime');
const benchmarkRoutes = require('./routes/benchmark');

const app = express();
app.use(express.json());
app.use(intrusionDetection);

// Database connection
mongoose.connect('mongodb://localhost:27017/your-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/custom-report', reportRoutes);
app.use('/real-time', realTimeRoutes);
app.use('/competitor-benchmark', benchmarkRoutes);

// WebSocket setup
const server = app.listen(3000, () => console.log(`Server is running on port 3000`));
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Endpoint to broadcast data
app.post('/track-behavior', async (req, res) => {
    broadcast({ message: 'User behavior updated', data: req.body });
    res.sendStatus(200);
});
