const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const { verificationLetter } = require("../../templates");


const register = async (req, res) => {
    const {email, password, access} = req.body;
    const user = await User.findOne({email});
    if(user) throw RequestError(400, "Email in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email, {s: "120", r: "pg", d: "identicon"});
    const verificationToken = uniqid();

    const updatedUser = await User.create({email, password: hashPassword, access, avatar, verificationToken});
    const html = verificationLetter(verificationToken);console.log(html)
    
    // --- checking email ---
    const letter = {
        to: email,
        subject: "Verification",
        html
    };
    await sendEmail(letter);
            
    res.status(201).json({
        message: "registered user in successfully",
        data: {
            email: updatedUser.email,
            access: updatedUser.access,
            verified: updatedUser.verified
        }
    })
};

module.exports = register;