const express = require("express");
const SOS = require("../models/SOS");

const router = express.Router();

/* Create SOS */
router.post("/sos", async (req, res) => {
    const sos = new SOS(req.body);
    await sos.save();

    res.json({ message: "SOS request sent successfully" });
});

/* Get All SOS Requests */
router.get("/sos", async (req, res) => {
    const sosList = await SOS.find();
    res.json(sosList);
});

module.exports = router;
