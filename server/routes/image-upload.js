const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { uploadProfileImage } = require("../controllers/profileimage");

router
  .route("/uploadProfileImage/:userEmail")
  .post(upload.single("image"), uploadProfileImage);

module.exports = router;
