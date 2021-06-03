const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const mongoose = require("mongoose");
const translateMessage = require("../utils/translateMessage");

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

// @route POST /users/conversation/:userId
// create a conversation with another user
exports.postUserConversation = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.userId;

  const conversationExists = await Conversation.findOne({
    users: [otherUserId, userId].sort(),
  });

  if (conversationExists) {
    return res.status(200).json({ id: conversationExists._id });
  }

  const conversation = await Conversation.create({
    users: [userId, otherUserId].sort(),
    messages: [],
  });

  if (conversation) {
    res.status(201).json({
      success: {
        id: conversation._id,
      },
    });
  } else {
    res.status(400);
    throw new Error("Conversation creation failed");
  }
});

// @route POST /users/groupchat
// create a new group chat with multiple users
exports.postGroupChat = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const users = req.body.users;
  const languages = await Promise.all(
    users.map(async (uid) => {
      const user = await User.findById(uid);
      return user.primaryLanguage;
    })
  );
  const conversation = await Conversation.create({
    users,
    languages,
    messages: [],
  });

  if (conversation) {
    res.status(201).json({
      success: {
        conversation,
      },
    });
  } else {
    res.status(400);
    throw new Error("Conversation creation failed");
  }
});

// @route POST /users/groupchat/:groupChatId/:userId
// add a user to the group chat and update supported languages
// also update the translations of each existing messages
exports.addUserToGroupChat = asyncHandler(async (req, res) => {
  const userIdToAdd = req.params.userId;
  const groupChatId = req.params.groupChatId;

  const conversation = await Conversation.findById(groupChatId);
  const userToAdd = await User.findById(userIdToAdd);

  if (conversation) {
    if (conversation.users.includes(userIdToAdd)) {
      return res.status(200).json({
        message: "User already exists in this group",
      });
    }
    if (
      conversation.messages?.length &&
      !conversation.languages.includes(userToAdd.primaryLanguage)
    ) {
      // if the newly-added user does not have language support,
      // and there are existing messages in the group chat
      // translate all existing messages to her language
      await Promise.all(
        conversation.messages.map(async (messageItem) => {
          const translation = await translateMessage(
            messageItem.message,
            messageItem.language,
            [userToAdd.primaryLanguage]
          );
          messageItem.translations.push(...translation);
          console.log(messageItem.translations);
        })
      );
      const updated = await conversation.save();
    }

    // Add userid and language to the chat record
    conversation.updateOne(
      {
        $addToSet: {
          users: userIdToAdd,
          languages: userToAdd.primaryLanguage,
        },
      },
      (error) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res.status(200).json({ message: "User added successfully" });
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("No conversations found");
  }
});
