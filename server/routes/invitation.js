const express = require("express");
const router = express.Router();

const { approve, reject } = require("../controllers/invitation");

router.route("/:id/approve").patch(approve);
router.route("/:id/reject").patch(reject);

module.exports = router;
