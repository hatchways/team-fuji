const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const mongoose = require("mongoose");
const translateMessage = require("../utils/translateMessage");

// @route GET /users/messages/:conversationId

exports.getMessages = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const conversationId = req.params.conversationId;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    res.status(400);
    throw new Error("Conversation id is not valid");
  }

  const conversation = await Conversation.findById(conversationId);
  const currentUser = await User.findById(userId);
  const primaryLanguage = currentUser.primaryLanguage;

  if (conversation) {
    return res.status(200).json({ messages: conversation.messages });
  } else {
    res.status(404);
    throw new Error("No conversation found");
  }
});

// @route POST /users/message/:conversationId
// send a message and automatically translate it from sender's language to
// all other recipients' languages and save the record
exports.postMessage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const conversationId = req.params.conversationId;
  const message = req.body.message;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    res.status(400);
    throw new Error("Invaid user id or conversation id");
  }

  const conversation = await Conversation.findById(conversationId);
  const currentUser = await User.findById(userId);

  if (conversation) {
    // get sender's primary language
    // and all other recipients' primary languages
    const fromLanguage = currentUser.primaryLanguage;
    const toLanguages = conversation.languages.filter(
      (lang) => lang !== fromLanguage
    );

    //translate
    const translations = await translateMessage(
      message,
      fromLanguage,
      toLanguages
    );

    // update database and return response
    conversation.updateOne(
      {
        $push: {
          messages: {
            sender: userId,
            message,
            language: fromLanguage,
            translations,
          },
        },
      },
      (err) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          return res.status(200).json({
            message,
            senderId: userId,
            chatId: conversationId,
            translations,
          });
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("Conversation not found");
  }
});
