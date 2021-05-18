const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],

  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  last_date: {
    type: Date,
  },
});

module.exports = Conversation = mongoose.model(
  "conversion",
  conversationSchema
);
