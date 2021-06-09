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
    console.log(new Date(), error);
    res.json({
      status: 500,
      message: error,
    });
  }
});

// @route GET /user/:id/invitations
// @desc Get a list of pending invitations that you are receiving from other users
exports.getPendingInvitation = asyncHandler(async (req, res, next) => {
  const { email } = await User.findById(req.params.id);
  try {
    const pendingInvitations = await Invitation.find({
      toUserEmail: email,
      approved: false,
      rejected: false,
    });
    const invitations = await Promise.all(
      pendingInvitations.map(async (invitation) => {
        const fromuser = await User.findOne(invitation.fromUser);
        return {
          id: invitation.id,
          rejected: invitation.rejected,
          approved: invitation.approved,
          fromUser: {
            email: fromuser.email,
            username: fromuser.username,
            primaryLanguage: fromuser.primaryLanguage,
            id: fromuser._id,
          },
        };
      })
    );
    res.json({
      status: "success",
      message: "Got pending invitations successfully",
      invitations,
    });
  } catch (error) {
    console.log(new Date(), error);
    res.json({
      status: 500,
      message: error,
    });
  }
});

// @route GET /user/contacts?offset&limit
// @desc Get a list of contacts specific that user accepted or get accepted by
exports.getContacts = asyncHandler(async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    const userId = req.user.id;
    const { email } = await User.findById(userId);

    // Set limit and offset for pagination
    const acceptedInvitations = await Invitation.find({
      $or: [
        {
          toUserEmail: email,
          approved: true,
        },
        {
          fromUser: userId,
          approved: true,
        },
      ],
    })
      .limit(limit)
      .skip(offset);

    let contacts = [];
    await Promise.all(
      acceptedInvitations.map(async (invitation) => {
        if (userId !== invitation.fromUser.toString()) {
          const user = await User.findById(invitation.fromUser);
          contacts.push({
            email: user.email,
            username: user.username,
            primaryLanguage: user.primaryLanguage,
            id: user._id,
          });
        } else {
          const user = await User.findOne({ email: invitation.toUserEmail });
          contacts.push({
            email: user.email,
            username: user.username,
            primaryLanguage: user.primaryLanguage,
            id: user._id,
          });
        }
      })
    );
    res.status(200).json({
      contacts,
    });
  } catch (error) {
    console.log(new Date(), error);
    res.json({
      status: 500,
      message: error,
    });
  }
});
