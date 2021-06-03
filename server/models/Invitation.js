const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUser: {
    type: String,
    default: "",
  },
  toUserEmail: {
    type: String,
  },
  rejected: {
    type: Boolean,
    default: false,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = Invitation = mongoose.model("invitation", invitationSchema);
