const nodemailer = require("nodemailer");
require("dotenv").config();

const {SERVICE_EMAIL, MAIL_API_KEY} = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SERVICE_EMAIL,
        pass: MAIL_API_KEY
    }
});

const sendEmail = async(letter)=>{
    const mail = {...letter, from: `RW Worship <${SERVICE_EMAIL}>`}
    await transporter.sendMail(mail);
    return true;
};

module.exports = sendEmail;