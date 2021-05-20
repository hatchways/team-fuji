const Message = require("./Message");
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    messages: [Message],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
