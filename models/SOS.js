const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SOS", sosSchema);
