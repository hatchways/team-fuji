const Invitation = require("../models/Invitation");
const asyncHandler = require("express-async-handler");

//@route patch /invitation + /:id/approve
//@desc Set invitation approved
exports.approve = asyncHandler(async (req, res, next) => {
  try {
    const updatedInvitationInfo = await Invitation.updateOne(
      { _id: req.params.id },
      { approved: true, rejected: false }
    );
    res.json({
      status: "success",
      message: "Invitation approved successfully",
      data: updatedInvitationInfo,
    });
  } catch (error) {
    console.log(new Date(), error);
    res.json({
      status: 500,
      message: error,
    });
  }
});

//@route patch /invitation + /:id/reject
//@desc Set invitation rejected
exports.reject = asyncHandler(async (req, res, next) => {
  try {
    const updatedInvitationInfo = await Invitation.updateOne(
      { _id: req.params.id },
      { rejected: true, approved: false }
    );
    res.json({
      status: "success",
      message: "Invitation rejected successfully",
      data: updatedInvitationInfo,
    });
  } catch (error) {
    console.log(new Date(), error);
    res.json({
      status: 500,
      message: error,
    });
  }
});
