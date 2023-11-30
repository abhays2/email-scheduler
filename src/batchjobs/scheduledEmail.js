/**
 * schedule cron job: every 1 min
 * *\/1 * * * *  node email-scheduler\src\batchjobs\scheduledEmail.js
 */
const moment = require("moment");
const emailModel = require("../models/emailModel");
const sendgridEmail = require("./../../config/sendgridConfig")

(async () => {
  try {
    const currentTime = moment().format("YYYY-MMM-DD  HH:MM");
    const emails = await emailModel.getScheduledEmails(currentTime);
    for (let i = 0; i < emails.length; i++) {
      const { subject, body, recipient, sender } = emails[i];
      const msg = {
        to: recipient,
        from: sender,
        subject: subject,
        html: body,
      };
      const emailStatus = await sendgridEmail.sgMail.send(msg);
      if (!emailStatus.ok) {
        const updateData = { status: "failed" };
        await emailModel.updateEmail(emails[i].id, updateData);
      } else {
        const updateData = { status: "sent" };
        await emailModel.updateEmail(emails[i].id,updateData);
      }
    }
  } catch (e) {
    console.log(e);
  }
})();
