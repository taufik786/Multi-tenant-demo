
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Name Field is required"],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Email Field is required!"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  message: { type: String, required: [true, "Message Field is required!"] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", User);
