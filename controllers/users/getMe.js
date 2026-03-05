const getMe = async(req, res) => {
    const {email, access, name, location} = req.user;
    res.status(200).json({email, access, name, location})
};

module.exports = getMe;