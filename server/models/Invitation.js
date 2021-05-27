const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  fromUser: [
    {
      type: String,
      required: true,
    },
  ],
  toUser: [
    {
      type: String,      
      required: true,
    },
  ],
  toUserEmail: [
    {
      type: String
    },
  ],
  rejected: [
    {
      type: Boolean,
      default: false,
      required: true,
    },
  ],

  approved: [
    {
      type: Boolean,
      default: false,
      required: true,
    },
  ],
});

module.exports = Invitation = mongoose.model("invitation", invitationSchema);
