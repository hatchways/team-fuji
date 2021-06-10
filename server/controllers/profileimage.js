const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
// @route PUT /image-upload/profileImage
// @desc Update Profile Image
// @access Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await User.updateOne(
      { _id: req.params.userId },
      { profileImageUrl: String(result.url) }
    );

    res.json(result.url);
  } catch (err) {
    console.log(err);
  }
});
