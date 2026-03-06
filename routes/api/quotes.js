const express = require("express");
const {ctrlWrapper} = require("../../helpers");
const {validateBody, authenticate, authorizeRole} = require("../../middlewares");
const {JoiQuote} = require("../../models/quote");
const ctrls = require("../../controllers/quotes");

const router = express.Router();

router.get("/:week", ctrlWrapper(ctrls.getQuote));
router.post("/", authenticate, authorizeRole("editor", "admin"), validateBody(JoiQuote.createQuoteSchema), ctrlWrapper(ctrls.addQuote))

module.exports = router;