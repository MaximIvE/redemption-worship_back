const register = require("./register");
const updateOwnInfo = require("./updateOwnInfo");
const login = require("./login");
const logout = require("./logout");
const getMe = require("./getMe");
const verificationRequest = require("./verificationRequest");

module.exports = {
    register,
    updateOwnInfo,
    login,
    logout,
    getMe,
    verificationRequest
}