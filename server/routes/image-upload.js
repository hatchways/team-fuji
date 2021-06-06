const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { uploadProfileImage } = require("../controllers/profileimage");
// This /uploadProfileImage might not be right
router
  .route("/uploadProfileImage/:userEmail")
  .post(upload.single("image"), uploadProfileImage);

module.exports = router;

// const router = require("express").Router();
// const cloudinary = require("../utils/cloudinary");
// const upload = require("../utils/multer");
// router.post("/single", upload.single("image"), async (req, res) => {
//   try {
//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/multiple", upload.array("images", 3), async (req, res) => {
//   try {
//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(
//       req.file.path.map((request) => request)
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });
// module.exports = router;

// // app.post("/single", upload.single("image"), async (req, res) => {
// //   const result = await cloudinary.uploader.upload(req.file.path);
// //   console.log(req.file);
// //   res.send("Single File upload success"); // Change so localhost does not need to wait for a response
// // });
