const validateBody = require("./validateBody");
const authenticate  = require("./authenticate");
const authorizeRole = require("./authorizeRole");

module.exports = {
    validateBody,
    authenticate,
    authorizeRole
}
