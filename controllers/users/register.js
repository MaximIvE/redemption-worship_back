const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
    const {email, password, access} = req.body;
    const user = await User.findOne({email});

    if(user) throw RequestError(400, "Email in use");
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({email, password: hashPassword, access});
    res.status(201).json({
        email: result.email,
        access: result.access
    })
};

module.exports = register