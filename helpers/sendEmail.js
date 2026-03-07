const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { MAIL_API_KEY, SERVICE_EMAIL } = process.env;


sgMail.setApiKey(MAIL_API_KEY);

const sendEmail = async(data) => {
    const mail = { ...data, from:  SERVICE_EMAIL};
    try {
        await sgMail.send(mail)
    } catch (error) {
        console.error(error.message);
        if (error.response) {
        console.error(error.response.body)
    }
    }
    return true;
}

module.exports = sendEmail;