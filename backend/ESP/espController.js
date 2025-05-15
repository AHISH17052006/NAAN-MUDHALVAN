import express from "express";

const router = express.Router();
let frequency = 0; // Initial Frequency

router.post("/set-frequency", (req, res) => {
  frequency = req.body.frequency;
  console.log(`ESP32 Frequency set to: ${frequency}`);
  res.json({ success: true, frequency });
});

router.get("/get-frequency", (req, res) => {
  res.json({ frequency });
});

export default router;
