const express = require("express");

const ctrls = require("../../controllers/lists");
const {ctrlWrapper} = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrls.getAll));
router.get("/:id", authenticate, ctrlWrapper(ctrls.getById));

module.exports = router;