const express = require("express");
const router = express.Router();
const {
  validateInvitationId,
  validateUserId,
  validateInvitation,
} = require("../validate");
const protect = require("../middleware/auth");
const { approve, reject } = require("../controllers/invitation");

const {
  createInvitation,
  getPendingInvitation,
  getContacts,
} = require("../controllers/userinvitation");

// create an invitation
router
  .route("/user/:id/invitation")
  .post(protect, validateInvitation, createInvitation);

// list pending invitations
router
  .route("/user/:id/invitations")
  .get(protect, validateUserId, getPendingInvitation);

// list accepted invitations
router.route("/user/contacts").get(protect, getContacts);

// approve an invitation
router
  .route("/invitation/:id/approve")
  .patch(protect, validateInvitationId, approve);

// reject an invitation
router
  .route("/invitation/:id/reject")
  .patch(protect, validateInvitationId, reject);

module.exports = router;
