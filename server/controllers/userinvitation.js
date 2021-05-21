const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Invitation = require("../models/Invitation");

// @route POST /user/:id/invitation
// @desc Create invitation from specific user
exports.createInvitation = asyncHandler(async (req, res, next) => {
  const { toUser, toUserEmail } = req.body;
  try {    
    const invitation = new Invitation({
      fromUser: req.params.id,
      toUser: toUser,
      toUserEmail: toUserEmail,
      approved: false,
      rejected: false,
    });
    const savedInvitationInfo = await invitation.save();
    res.json({
        status: "success",
        message: "Invitation created successfully",
        data: savedInvitationInfo,
      });
  } catch (error) {
    res.json({ message: error });
  }
});

// @route GET /user/:id/invitation
// @desc Get a list of pending invitations that you are receiving from other users
exports.getPendingInvitation = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const pendingInvitations = await Invitation.find({
      toUser: userId,
      approved: false,
      rejected: false
    });
    res.json({
        status: "success",
        message: "Got pending invitations successfully",
        data: pendingInvitations,
      });
  } catch (error) {
    res.json({ message: error });
  }
});

// @route GET /user/:id/contracts
// @desc Get a list of contacts specific user accepted
exports.getContracts = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const acceptedInvitations = await Invitation.find({
      toUser: userId,
      approved: true
    });
    res.json({
        status: "success",
        message: "Got accepted invitations successfully",
        data: acceptedInvitations,
      });
  } catch (error) {
    res.json({ message: error });
  }
});
