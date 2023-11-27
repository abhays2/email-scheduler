const mandrillConfig = require("../../config/mandrillConfig");

const scheduleEmail = async (emailData) => {
  const { subject, body, recipient, sender, scheduledTime } = emailData;

  // Sending email using Mandrill
  const mandrillMessage = {
    subject,
    html: body,
    to: [{ email: recipient }],
    from_email: sender,
    send_at: scheduledTime,
  };

  try {
    const result = await mandrillConfig.mandrill.messages.send({
      message: mandrillMessage,
    });

    // Return Mandrill message id
    return result[0]._id;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// method to cancel a mandrill message by its message id
const cancelEmail = async (messageId) => {
  try {
    const result = await mandrillConfig.mandrill.messages.cancel({
      message_id: messageId,
    });
    return result;
  } catch (error) {
    console.error("Error canceling email:", error);
    throw error;
  }
};

module.exports = {
  scheduleEmail,
  cancelEmail,
};
