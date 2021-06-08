const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { uploadProfileImage } = require("../controllers/profileimage");
const { uploadImageMessage } = require("../controllers/message");
router
  .route("/uploadProfileImage/:userEmail")
  .post(upload.single("image"), uploadProfileImage);

router
  .route("/uploadImageMessage/:userEmail")
  .post(upload.array("images", 3), uploadImageMessage);

module.exports = router;
