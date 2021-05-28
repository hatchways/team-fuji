const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const {
  getUserConversations,
  postUserConversation,
} = require("../controllers/conversation");
const { getMessages, postMessage } = require("../controllers/message");

router.route("/").get(protect, searchUsers);
router.route("/conversations").get(protect, getUserConversations);
router.route("/conversation/:userId").post(protect, postUserConversation);
router.route("/messages/:conversationId").get(protect, getMessages);
router.route("/message/:conversationId").post(protect, postMessage);

module.exports = router;
