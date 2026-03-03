const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");


const updateInfoOne =  async (req, res) => {
    const _id = req.params.id;

    const user = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true, runValidators: true});

    if(!updatedUser) throw RequestError(404);

    res.status(200).json(updatedUser)
};

module.exports = updateInfoOne;