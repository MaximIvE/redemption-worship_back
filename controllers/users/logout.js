const { User } = require("../../models/user");

require("dotenv").config();

const logout = async(req, res) => {
    const _id = req.user._id;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.status(204).send();
};

module.exports = logout;