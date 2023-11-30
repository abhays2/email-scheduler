const Joi = require("joi");
const emailService = require("../services/emailService");
const emailModel = require("../models/emailModel");

const createEmail = async (req, res, next) => {
  try {
    const emailData = req.body; // assuming request body has proper data

    const schema = Joi.object({
      sender: Joi.string().required(),
      recipient: Joi.string().required(),
      subject: Joi.string().required(),
      body: Joi.string().required(),
      status: Joi.string().valid("scheduled", "sent", "failed", "deleted"),
      scheduledTime: Joi.date().required(),
    });

    const { error } = schema.validate(emailData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const insertedEmail = await emailModel.createEmail(emailData);
    res.json(insertedEmail);
  } catch (error) {
    console.error("Error creating email:", error);
    next(error);
  }
};

const getEmailById = async (req, res, next) => {
  try {
    const emailId = req.params.id;
    const email = await emailModel.getEmailById(emailId);
    res.json(email);
  } catch (error) {
    console.error("Error getting email by ID:", error);
    next(error);
  }
};

const getAllEmails = async (req, res, next) => {
  try {
    const emails = await emailModel.getAllEmails();
    res.json(emails);
  } catch (error) {
    console.error("Error getting all emails:", error);
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const emailId = req.params.id;
    const updateData = req.body;

    const schema = Joi.object({
      sender: Joi.string().optional(),
      recipient: Joi.string().optional(),
      subject: Joi.string().optional(),
      body: Joi.string().optional(),
      scheduledTime: Joi.date().optional(),
      status: Joi.string()
        .valid("scheduled", "sent", "failed", "deleted")
        .optional(),
    });

    const { error } = schema.validate(updateData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    let updatedEmail = await emailModel.updateEmail(emailId, updateData);
    res.json(updatedEmail);
  } catch (error) {
    console.error("Error updating email:", error);
    next(error);
  }
};

const deleteEmail = async (req, res, next) => {
  try {
    const emailId = req.params.id;
    const deletedEmail = await emailModel.deleteEmail(emailId);
    res.json(deletedEmail);
  } catch (error) {
    console.error("Error deleting email:", error);
    next(error);
  }
};

const getFailedEmails = async (req, res, next) => {
  try {
    const failedEmails = await emailModel.getFailedEmails();
    res.json(failedEmails);
  } catch (error) {
    console.error("Error listing failed emails:", error);
    next(error);
  }
};

const sendEmail = async (req, res, next) => {
  try {
    console.log('hii');
    
  } catch (error) {
    console.error("Error scheduling email:", error);
    next(error);
  }
};

module.exports = {
  createEmail,
  getEmailById,
  getAllEmails,
  updateEmail,
  deleteEmail,
  getFailedEmails,
  sendEmail
};
