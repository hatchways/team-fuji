const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateInvitation } = require("../validate");
const { approve, reject } = require("../controllers/invitation");

router.route("/:id/approve").patch(protect, validateInvitation, approve);
router.route("/:id/reject").patch(protect, validateInvitation, reject);

module.exports = router;
