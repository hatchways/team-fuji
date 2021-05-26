const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");
const { deleteOne } = require("../models/Conversation");

// @route GET /users/messages/:conversationId

exports.getMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.conversationId;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    res.status(400);
    throw new Error("Conversation id is not valid");
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
  });

  if (conversation) {
    return res.status(200).json({ messages: conversation.messages });
  } else {
    res.status(404);
    throw new Error("No conversation found");
  }
});

// @route POST /users/message/:conversationId

exports.postMessage = asyncHandler(async (req, res) => {
  const sender = req.user.id;
  const conversationId = req.params.conversationId;
  const message = req.body.message;

  if (
    !mongoose.Types.ObjectId.isValid(sender) ||
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    res.status(400);
    throw new Error("Invaid user id or conversation id");
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
    users: sender,
  });

  if (conversation) {
    conversation.updateOne(
      {
        $push: {
          messages: { sender, message },
        },
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          return res.send("Successfully sent");
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("Conversation not found");
  }
});
