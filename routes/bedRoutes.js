const express = require("express");
const Bed = require("../models/Bed");

const router = express.Router();

/* TEST ROUTE */
router.get("/ping", (req, res) => {
    res.send("BED ROUTE WORKING");
});

/* ADD / UPDATE BED DATA */
router.post("/beds", async (req, res) => {
    const { icuBeds, emergencyBeds } = req.body;

    const bed = new Bed({ icuBeds, emergencyBeds });
    await bed.save();

    res.json({ message: "Beds saved successfully" });
});

/* GET LATEST BED DATA */
router.get("/beds", async (req, res) => {
    const beds = await Bed.find().sort({ updatedAt: -1 }).limit(1);
    res.json(beds[0]);
});

module.exports = router;
