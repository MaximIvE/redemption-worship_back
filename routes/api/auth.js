const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const ctrls = require("../../controllers/users");
const {ctrlWrapper} = require("../../helpers");
const { JoiUsers } = require("../../models/user");


const router = express.Router();

router.post("/register", validateBody(JoiUsers.registerSchema), ctrlWrapper(ctrls.register));
router.post("/login", validateBody(JoiUsers.loginSchema ), ctrlWrapper(ctrls.login));

router.post("/logout", authenticate, ctrlWrapper(ctrls.logout));
router.get("/me", authenticate, ctrlWrapper(ctrls.getMe));
router.put("/me", authenticate, validateBody(JoiUsers.updateInfoSchema ), ctrlWrapper(ctrls.updateOwnInfo));

router.get("/verification/:vt", ctrlWrapper(ctrls.verificationRequest));

module.exports = router;