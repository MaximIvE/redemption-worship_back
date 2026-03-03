import bcrypt from "bcryptjs";
import { User } from "../../models/user";
import { RequestError } from "../../helpers";

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) throw RequestError(400, "Email in use");
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({email, password: hashPassword});
    res.status(201).json({
        email: result.email,
        access: result.access
    })
};

module.exports = register