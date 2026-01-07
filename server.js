const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Swift Aid Backend is running 🚑");
});

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});
// In-memory ambulance queue (for FYP demo)
let ambulanceQueue = [];

io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // 🚑 Ambulance heading to hospital
    socket.on("ambulance:dispatch", (data) => {
        const ambulance = {
            id: `AMB-${Date.now()}`,
            eta: data.eta || 10,
            severity: data.severity || "medium",
            status: "incoming",
        };

        ambulanceQueue.push(ambulance);

        io.emit("ambulance:incoming", ambulance);
    });

    // 🟢 Hospital accepts ambulance
    socket.on("hospital:accept", (amb) => {
        ambulanceQueue = ambulanceQueue.map((a) =>
            a.id === amb.id ? { ...a, status: "accepted" } : a
        );

        io.emit("ambulance:status", {
            id: amb.id,
            status: "accepted",
        });
    });

    // 🔴 Hospital diverts ambulance
    socket.on("hospital:divert", (amb) => {
        ambulanceQueue = ambulanceQueue.filter((a) => a.id !== amb.id);

        io.emit("ambulance:status", {
            id: amb.id,
            status: "diverted",
        });
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});