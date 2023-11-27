const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");


router.get("/failed", emailController.getFailedEmails);
router.get("/:id", emailController.getEmailById);
router.put("/:id", emailController.updateEmail);
router.delete("/:id", emailController.deleteEmail);
router.post("/", emailController.createEmail);
router.get("/", emailController.getAllEmails);

module.exports = router;
