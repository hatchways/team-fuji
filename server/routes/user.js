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
  renameConversation,
  getConversation,
} = require("../controllers/conversation");
const {
  getMessages,
  postMessage,
  getLimitedMessages,
  deleteMessage,
} = require("../controllers/message");

router.route("/").get(protect, searchUsers);
router.route("/conversations").get(protect, getUserConversations);
router.route("/conversation/:conversationId").get(protect, getConversation);
router.route("/conversation/:userId").post(protect, postUserConversation);
router.route("/messages/:conversationId").get(protect, getLimitedMessages);
router.route("/message/:conversationId").post(protect, postMessage);
router.route("/groupchat").post(protect, postGroupChat);
router.route("/groupchat/:groupChatId").post(protect, addUserToGroupChat);
router
  .route("/conversation/:conversationId/users")
  .get(protect, getUsersInAChat);
router
  .route("/message/:conversationId/:messageId")
  .delete(protect, deleteMessage);
router
  .route("/renameConversation/:conversationId")
  .patch(protect, renameConversation);
module.exports = router;
