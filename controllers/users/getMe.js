const getMe = async(req, res) => {
    const {email, access, name, location, avatar, verify} = req.user;
    
    res.status(200).json({email, access, name, location, avatar, verify})
};

module.exports = getMe;