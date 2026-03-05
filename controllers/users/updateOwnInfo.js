const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");


const updateOwnInfo =  async (req, res) => {
    const _id = req.user._id;
    const user = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true, runValidators: true}).select('-token -password -createdAt -updatedAt');
    if(!updatedUser) throw RequestError(404);

    res.status(200).json(updatedUser)
};

module.exports = updateOwnInfo;