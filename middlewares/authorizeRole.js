const { RequestError } = require("../helpers")

const authorizeRole = (...access) => {
    return (req, res, next) => {
        if(!req.user) throw RequestError(401, "Not authenticated");
        
        if(access.includes(req.user.role)) return next();
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = authorizeRole;