"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      required: false,
      type: String,
    },
    verified_at: {
      required: false,
      type: Date,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Users", userSchema);
