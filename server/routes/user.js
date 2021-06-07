const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const {
  getUserConversations,
  postUserConversation,
  postGroupChat,
  addUserToGroupChat,
  getUsersInAChat,
} = require("../controllers/conversation");
const {
  getMessages,
  postMessage,
  getLimitedMessages,
} = require("../controllers/message");

router.route("/").get(protect, searchUsers);
router.route("/conversations").get(protect, getUserConversations);
router.route("/conversation/:userId").post(protect, postUserConversation);
router.route("/messages/:conversationId").get(protect, getLimitedMessages);
router.route("/message/:conversationId").post(protect, postMessage);
router.route("/groupchat").post(protect, postGroupChat);
router.route("/groupchat/:groupChatId").post(protect, addUserToGroupChat);
router
  .route("/conversation/:conversationId/users")
  .get(protect, getUsersInAChat);

module.exports = router;
