npm startconst mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
    icuBeds: Number,
    emergencyBeds: Number,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bed", bedSchema);
