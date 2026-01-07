const express = require("express");
const Ambulance = require("../models/Ambulance");

const router = express.Router();

/* Add Ambulance */
router.post("/ambulances", async (req, res) => {
    const ambulance = new Ambulance(req.body);
    await ambulance.save();

    res.json({ message: "Ambulance added successfully" });
});

/* Get All Ambulances */
router.get("/ambulances", async (req, res) => {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
});

module.exports = router;
