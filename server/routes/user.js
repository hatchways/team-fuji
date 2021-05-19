const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const { getUserConversations } = require("../controllers/conversation");

router.route("/").get(protect, searchUsers);
router.route("/:id/conversations").get(protect, getUserConversations);

module.exports = router;
