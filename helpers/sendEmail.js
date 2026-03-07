const nodemailer = require("nodemailer");
require("dotenv").config();

const {SERVICE_EMAIL, MAIL_API_KEY} = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SERVICE_EMAIL,
        pass: MAIL_API_KEY
    }
});

const sendEmail = async(letter)=>{
    await transporter.sendMail({...letter, from: `RW Worship <${SERVICE_EMAIL}>`});
    return true;
};

module.exports = sendEmail;