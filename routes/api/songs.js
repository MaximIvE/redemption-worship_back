const express = require("express");

const ctrls = require("../../controllers/songs");
const {ctrlWrapper} = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { addSongSchema } = require("../../schemas/songs");

const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));

router.post("/", validateBody(addSongSchema), ctrlWrapper(ctrls.add));
// router.put("/:id", validateBody(addSongSchema), ctrlWrapper(ctrls.updateById));

module.exports = router;