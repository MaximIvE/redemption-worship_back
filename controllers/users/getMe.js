const getMe = async(req, res) => {
    const {email, access, name, location, avatar, verified} = req.user;
    res.status(200).json({data: {email, access, name, location, avatar, verified}})
};

module.exports = getMe;