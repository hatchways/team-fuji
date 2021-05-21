const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

// @route GET /users/conversations
exports.getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // if id is not valid return bad request response
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("User id is not valid");
  }

  const conversationList = await Conversation.find({
    users: userId,
  });

  if (conversationList?.length) {
    return res.status(200).json(conversationList);
  } else {
    res.status(404);
    throw new Error("No conversations found");
  }
});
