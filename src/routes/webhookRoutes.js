const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");


router.post("/webhook", emailController.handleMandrillWebhook);

module.exports = router;
