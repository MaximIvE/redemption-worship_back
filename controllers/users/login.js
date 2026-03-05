const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) throw RequestError(401, "Invalid credentials");
    const isPasswTrue = await bcrypt.compare(password, user.password);
    if(!isPasswTrue) throw RequestError(401, "Invalid credentials");

    const payload = {id: user._id, access: user.access};
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate({_id: user._id}, {token})

    res.json({
        message: "logged in succesfylly", access: user.access, token
    })
};

module.exports = login;