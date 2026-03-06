const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");


const verificationRequest = async (req, res) => {
    const {vt} = req.params;
    const user = await User.findOne({verificationToken: vt});
    if(!user) throw RequestError(404, "User not found");
    const {_id} = user;
    await User.findByIdAndUpdate(_id, { verificationToken: null, verify: true });
    res.json({message: "Verification successful"})
};

module.exports = verificationRequest;