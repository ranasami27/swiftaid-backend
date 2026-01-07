const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});

app.get('/', (req, res) => {
    res.send('SwiftAid Backend Running');
});

server.listen(5000, () => console.log('Server running on port 5000'));
