const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);

const createEmail = async (emailData) => {
  
  try {
    const insertedEmail = await knex("emails").insert(emailData).returning("*");
    return insertedEmail;
  } catch (error) {
    console.error("Error creating email:", error);
    throw error;
  }
};

const getEmailById = async (id) => {
  try {
    const email = await knex("emails").where("id", id).first();
    return email;
  } catch (error) {
    console.error("Error getting email by ID:", error);
    throw error;
  }
};

const getAllEmails = async () => {
  try {
    const emails = await knex("emails");
    return emails;
  } catch (error) {
    console.error("Error getting all emails:", error);
    throw error;
  }
};

const updateEmail = async (id, updatedData) => {
  try {
  if (!updatedData.updatedAt) {
      updatedData.updatedAt = knex.fn.now();
    }
    const updatedEmail = await knex("emails")
      .where("id", id)
      .update(updatedData)
      .returning("*");
    return updatedEmail;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

const deleteEmail = async (id) => {
  try {
    const deletedEmail = await knex("emails").where("id", id)
      // .del()
      .update({ status: "deleted", updatedAt: knex.fn.now() })
      .returning("*");
    return deletedEmail;
  } catch (error) {
    console.error("Error deleting email:", error);
    throw error;
  }
};

const getFailedEmails = async () => {
  try {
    const failedEmails = await knex("emails")
      .where("status", "=", "failed")
      .select("*");
    return failedEmails;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Error getting failed emails: ${error.message}`);
  }
};

const updateEmailByMandrillId = async (mandrillId, updatedData) => {
  try {
    updatedData.updatedAt = knex.fn.now();
    const updatedEmail = await knex("emails")
      .where("mandrillId", mandrillId)
      .update(updatedData)
      .returning("*");
    return updatedEmail;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

module.exports = {
  createEmail,
  getEmailById,
  getAllEmails,
  updateEmail,
  deleteEmail,
  getFailedEmails,
  updateEmailByMandrillId,
};
