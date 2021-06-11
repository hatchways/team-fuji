const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const mongoose = require("mongoose");
const translateMessage = require("../utils/translateMessage");

// @route GET /users/conversations?offset&limit
exports.getUserConversations = asyncHandler(async (req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const userId = req.user.id;

  // if id is not valid return bad request response
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("User id is not valid");
  }

  const conversationList = await Conversation.find(
    {
      users: userId,
    },
    {
      messages: {
        $slice: [0, 1],
      },
    }
  )
    .sort({ updatedAt: -1 })
    .populate({
      path: "users",
    })
    .limit(limit)
    .skip(offset);

  if (conversationList?.length) {
    return res.status(200).json({ conversations: conversationList });
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
    res.status(500);
    throw new Error("Conversation creation failed");
  }
});

// @route POST /users/groupchat
// create a new group chat with multiple users
exports.postGroupChat = asyncHandler(async (req, res) => {
  const users = [...req.body.users, req.user.id];
  const languages = await Promise.all(
    users.map(async (uid) => {
      const user = await User.findById(uid);
      return user.primaryLanguage;
    })
  );
  let conversation = await Conversation.create({
    users,
    languages,
    messages: [],
  });

  conversation = await conversation.populate("users").execPopulate();

  if (conversation) {
    res.status(201).json({
      conversation,
    });
  } else {
    res.status(500);
    throw new Error("Groupchat creation failed");
  }
});

// @route POST /users/groupchat/:groupChatId
// add a list of users to the group chat and update supported languages
// also update the translations of each existing messages
exports.addUserToGroupChat = asyncHandler(async (req, res) => {
  const usersToAdd = req.body.users;
  const groupChatId = req.params.groupChatId;

  const conversation = await Conversation.findById(groupChatId);
  if (conversation) {
    // Check if all the new users already exist in the group
    // and filter out the users that are already in the group
    const filteredUsers = usersToAdd.filter(
      (user) => !conversation.users.includes(user)
    );
    if (!filteredUsers?.length) {
      return res.status(400).json({
        message: "No user(s) to add in this group",
      });
    }

    // Get all the languages of the newly-added users
    const languages = await Promise.all(
      filteredUsers.map(async (uid) => {
        const user = await User.findById(uid);
        return user.primaryLanguage;
      })
    );

    // Filter languages so that the messages won't be translated twice
    // for languages that are already supported
    // Also remove duplicates since we only need to translate each new language once
    const filteredLanguages = languages.filter(
      (lang, index) =>
        !conversation.languages.includes(lang) &&
        languages.indexOf(lang) === index
    );

    if (conversation.messages?.length && filteredLanguages?.length) {
      // if the newly-added users does not have language support,
      // and there are existing messages in the group chat
      // translate all existing messages to their languages
      await Promise.all(
        conversation.messages.map(async (messageItem) => {
          const translations = await translateMessage(
            messageItem.message,
            messageItem.language,
            filteredLanguages
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
          users: { $each: filteredUsers },
          languages: { $each: filteredLanguages },
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

// @route GET /users/conversation/:conversationId/users
exports.getUsersInAChat = asyncHandler(async (req, res) => {
  const conversationId = req.params.conversationId;
  const currentUserId = req.user.id;
  const conversation = Conversation.findById(conversationId)
    .populate({
      path: "users",
    })
    .select("users")
    .then((result) =>
      res.status(200).json({
        users: result.users.reduce((result, user) => {
          if (user._id.toString() !== currentUserId) {
            result.push({
              username: user.username,
              email: user.email,
              primaryLanguage: user.primaryLanguage,
              _id: user._id,
            });
          }
          return result;
        }, []),
      })
    )
    .catch((error) => res.status(500).json({ error }));
});
