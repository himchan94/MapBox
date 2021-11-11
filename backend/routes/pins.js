const router = require("express").Router();

const Pin = require("../models/Pin");

// create a Pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save(); // this is async -await
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all Pins

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(err);
  }
});

//export

module.exports = router;
