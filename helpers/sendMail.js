const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "mail.google.com",
  port: 465,
  secure: true,
  auth: {
    user: "andre29839@gmail.com",
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async (data) => {
  const email = { ...data, from: "andre29839@gmail.com" };
  const info = await transporter.sendMail(email);

  return info;
};

module.exports = sendMail;
