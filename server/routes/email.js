const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { sendemail } = require("../controllers/sendemail");

router.route("/sendemail")
  .post(protect,sendemail);

module.exports = router;
