const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const mongoose = require("mongoose");
const translateMessage = require("../utils/translateMessage");

// @route GET /users/messages/:conversationId

exports.getMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.conversationId;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    res.status(400);
    throw new Error("Conversation id is not valid");
  }

  const conversation = await Conversation.findById(conversationId);

  if (conversation) {
    return res.status(200).json({ messages: conversation.messages });
  } else {
    res.status(404);
    throw new Error("No conversation found");
  }
});

// @route GET /users/messages/:conversationId?offset&limit
// Get a batch of messages if offset and limit is specified
// Otherwise return all messages
exports.getLimitedMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.conversationId;
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    res.status(400);
    throw new Error("Conversation id is not valid");
  }
  let conversation;

  if (req.query.offset && req.query.limit) {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    conversation = await Conversation.findById(conversationId, {
      messages: {
        $slice: [offset, limit],
      },
    });
  } else {
    conversation = await Conversation.findById(conversationId);
  }

  if (!conversation) {
    res.status(404);
    throw new Error("No conversation is found");
  }

  if (conversation.messages) {
    return res.status(200).json({ messages: conversation.messages });
  } else {
    res.status(400);
    throw new Error("No more messages");
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
    const Id = new mongoose.Types.ObjectId().toHexString();
    conversation.updateOne(
      {
        $push: {
          messages: {
            $each: [
              {
                _id: Id,
                sender: userId,
                message,
                language: fromLanguage,
                translations,
              },
            ],
            $position: 0,
          },
        },
      },
      (error) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({
            message: {
              _id: Id,
              message,
              sender: userId,
              chatId: conversationId,
              translations,
            },
          });
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("Conversation not found");
  }
});

// @route DELETE  /users/message/:conversationId/:messageId
exports.deleteMessage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const conversationId = req.params.conversationId;
  const messageId = req.params.messageId;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    res.status(400);
    throw new Error("Invaid user id or conversation id");
  }

  const conversation = await Conversation.findById(conversationId);
  if (conversation) {
    conversation.updateOne(
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      },
      (error) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({
            success: "Delete success!",
          });
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("Conversation not found");
  }
});
