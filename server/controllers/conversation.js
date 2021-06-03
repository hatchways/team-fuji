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
    return res.status(400).json({ message: "Conversation already exists" });
  }

  const currentUser = await User.findById(userId);
  const theOtherUser = await User.findById(otherUserId);
  const conversation = await Conversation.create({
    users: [userId, otherUserId].sort(),
    languages: [currentUser.primaryLanguage, theOtherUser.primaryLanguage],
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

// @route POST /users/groupchat
// create a new group chat with multiple users
exports.postGroupChat = asyncHandler(async (req, res) => {
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
    throw new Error("Groupchat creation failed");
  }
});

// @route POST /users/groupchat/:groupChatId
// add a list of users to the group chat and update supported languages
// also update the translations of each existing messages
exports.addUserToGroupChat = asyncHandler(async (req, res) => {
  const usersToAdd = req.body.users;
  const groupChatId = req.params.groupChatId;

  const languages = await Promise.all(
    usersToAdd.map(async (uid) => {
      const user = await User.findById(uid);
      return user.primaryLanguage;
    })
  );

  const conversation = await Conversation.findById(groupChatId);

  if (conversation) {
    if (usersToAdd.every((user) => conversation.users.includes(user))) {
      return res.status(400).json({
        message: "User(s) already exist in this group",
      });
    }
    if (
      conversation.messages?.length &&
      !languages.every((lang) => conversation.languages.includes(lang))
    ) {
      // if the newly-added user does not have language support,
      // and there are existing messages in the group chat
      // translate all existing messages to her language
      await Promise.all(
        conversation.messages.map(async (messageItem) => {
          const translations = await translateMessage(
            messageItem.message,
            messageItem.language,
            languages
          );
          messageItem.translations.push(...translations);
        })
      ).catch((error) => {
        res.status(500).json({ error });
        throw new Error("User(s) add failed");
      });
      await conversation.save();
    }

    // Add userid and language to the chat record
    conversation.updateOne(
      {
        $addToSet: {
          users: { $each: usersToAdd },
          languages: { $each: languages },
        },
      },
      (error) => {
        if (error) {
          return res.status(500).json({ error });
        } else {
          return res
            .status(200)
            .json({ message: "User(s) added successfully" });
        }
      }
    );
  } else {
    res.status(404);
    throw new Error("Groupchat is not found");
  }
});
