const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const protect = require("../middleware/auth");
const { uploadProfileImage } = require("../controllers/profileimage");
const { uploadImageMessage } = require("../controllers/message");
router
  .route("/uploadProfileImage/:userId")
  .post(upload.single("image"), uploadProfileImage);

router
  .route("/uploadImageMessage/:userId")
  .post(upload.array("images", 3), uploadImageMessage);

module.exports = router;
