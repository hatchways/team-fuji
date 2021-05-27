const express = require("express");
const router = express.Router();

const { createInvitation, getPendingInvitation, getContracts } = require("../controllers/userinvitation");

router.route("/:id/invitation").post(createInvitation);
router.route("/:id/invitations").get(getPendingInvitation);
router.route("/:id/contracts").get(getContracts);


module.exports = router;