const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// @route POST /image-upload/profileImage
// @desc Add Profile Image
// @access Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  console.log("params", req.params);
  console.log("query", req.query);
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const updatedProfileImageUrl = await User.updateOne(
      { email: req.params.userEmail },
      { profileImageUrl: String(result.url) }
    );

    console.log({ updatedProfileImageUrl });
    res.json(result.url);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

//   var conditions = { id: req.params.id }
//   , update = { profileImageUrl: }
//   , options = { multi: true };

// Model.update(conditions, update, options, callback);

// function callback (err, numAffected) {
//   // numAffected is the number of updated documents
// })
// if (user) {
//   const token = generateToken(user._id);
//   const secondsInWeek = 604800;

//   res.cookie("token", token, {
//     httpOnly: true,
//     maxAge: secondsInWeek * 1000,
//   });

//   res.status(201).json({
//     success: {
//       user: {
//         id: user._id,
//         primaryLanguage: user.primaryLanguage,
//         email: user.email,
//       },
//     },
//   });
// } else {
//   res.status(400);
//   throw new Error("Invalid user data");
// }
// const userId = req.user.id;
// const otherUserId = req.params.userId;

// const conversationExists = await Conversation.findOne({
//   users: [otherUserId, userId].sort(),
// });

// if (conversationExists) {
//   return res.status(200).json({ id: conversationExists._id });
// }

// const conversation = await Conversation.create({
//   users: [userId, otherUserId].sort(),
//   messages: [],
// });

// if (conversation) {
//   res.status(201).json({
//     success: {
//       id: conversation._id,
//     },
//   });
// } else {
//   res.status(400);
//   throw new Error("Conversation creation failed");
// }
// }
