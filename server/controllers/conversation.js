const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");

// @route GET /user/:id/conversations
exports.getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const converstionList = await Conversation.find({
    users: userId,
  });

  if (converstionList?.length) {
    return res.status(200).json(converstionList);
  } else {
    res.status(404);
    throw new Error("No conversations is found");
  }
});
