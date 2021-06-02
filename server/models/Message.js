const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    language: String,
    translations: [{ language: String, translation: String }],
  },
  { timestamps: true }
);

module.exports = MessageSchema;
