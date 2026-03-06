const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const verificationLetter = require("../../templates/verificationLetter");


const register = async(req, res) => {
    const {email, password, access} = req.body;
    const user = await User.findOne({email});
    if(user) throw RequestError(400, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email, {s: "120", r: "pg", d: "identicon"});
    const verificationToken = uniqid();

    const result = await User.create({email, password: hashPassword, access, avatar, verificationToken});
    
    // --- checking email ---
    const letter = {
        to: email,
        subject: "Verification",
        html: verificationLetter(verificationToken)
    };
    await sendEmail(letter);
            
    res.status(201).json({
        email: result.email,
        access: result.access
    })
};

module.exports = register;