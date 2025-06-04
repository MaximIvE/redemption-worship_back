const express = require("express");
const {ctrlWrapper} = require("../../helpers");
const {validateBody} = require("../../middlewares");
const {JoiQuote} = require("../../models/quote");
const ctrls = require("../../controllers/quotes");

const router = express.Router();

router.get("/current", ctrlWrapper(ctrls.getCurrentQuote));
router.post("/", validateBody(JoiQuote.createQuoteSchema), ctrlWrapper(ctrls.addQuote))

module.exports = router;