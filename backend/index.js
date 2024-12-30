// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
app.use(bodyParser.json());
app.use(require('cors')());


const client = redis.createClient({
    password: 'TtEQ83rR45LaIoNyVuFZRc5Z2YoNbmPG',
    socket: {
        host: 'redis-15841.c321.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15841
    }
});
client.connect().catch(console.error);


// Initialize TODO list in Redis
client.on('connect', async () => {
    const exists = await client.exists('todos');
    if (!exists) await client.set('todos', JSON.stringify([]));
});

// Load TODO list
app.get('/load', async (req, res) => {
    try {
        const data = await client.get('todos');
        res.json(JSON.parse(data || '[]'));
    } catch (err) {
        res.status(500).json({ error: 'Redis error' });
    }
});

// Save TODO list
app.post('/save', async (req, res) => {
    try {
        const todos = req.body; // Frontend should send an array of TODO items
        await client.set('todos', JSON.stringify(todos)); // Save to Redis
        res.json({ status: 'save successful' });
    } catch (err) {
        console.error('Error saving to Redis:', err);
        res.status(500).json({ error: 'Redis error' });
    }
});


// Clear TODO list
app.get('/clear', async (req, res) => {
    try {
        await client.set('todos', JSON.stringify([]));
        res.json({ status: 'clear successful' });
    } catch (err) {
        res.status(500).json({ error: 'Redis error' });
    }
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
