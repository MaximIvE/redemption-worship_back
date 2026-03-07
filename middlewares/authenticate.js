const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require('../models/user');
const { RequestError } = require("../helpers");


const { SECRET_KEY } = process.env;

const authenticate  = async (req, _, next) => {
    try {
        const {authorization = ""} = req.headers;
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer") throw RequestError(401, "Not authorized");
        const payload = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(payload.id);
        if (!user || (user.token !== token)) throw RequestError(401, "Not authorized");
        req.user = user;
        next()
    } catch (error) {
        if(!error.status){
            error.status = 401;
            error.message = "Not authorized";
        };
        next(error);
    }
};

module.exports = authenticate;