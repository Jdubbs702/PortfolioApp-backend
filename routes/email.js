const express = require("express");
const emailController = require("../controllers/email");

const router = express.Router();

router.post("/inquiry", emailController.sendMeInquirerEmail);
router.post("/confirmation", emailController.sendConfirmEmail);

module.exports = router;
