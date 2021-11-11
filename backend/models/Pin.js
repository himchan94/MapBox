const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    title: { type: String, require: true, min: 3 },
    desc: { type: String, require: true, min: 3 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// timestamps automaticaly update user createdat, updatedat

module.exports = mongoose.model("Pin", PinSchema);
