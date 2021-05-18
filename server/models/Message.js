import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  send_date: {
    type: Date,
  },
});

module.exports = Message = mongoose.model("message", MessageSchema);
