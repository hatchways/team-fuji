const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

// @route GET /users/:id/conversations
exports.getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // if id is not valid return bad request response
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("User id is not valid");
  }

  const converstionList = await Conversation.find({
    users: userId,
  });

  if (converstionList?.length) {
    return res.status(200).json(converstionList);
  } else {
    res.status(404);
    throw new Error("No conversations found");
  }
});
