const Message = require("./Message");
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    nickname: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    languages: [String],
    messages: [Message],
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
