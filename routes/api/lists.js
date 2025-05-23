const express = require("express");

const ctrls = require("../../controllers/lists");
const {ctrlWrapper} = require("../../helpers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));

module.exports = router;