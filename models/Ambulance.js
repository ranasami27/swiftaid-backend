const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
    ambulanceNumber: String,
    driverName: String,
    status: {
        type: String,
        default: "Available"
    },
    latitude: Number,
    longitude: Number,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Ambulance", ambulanceSchema);
