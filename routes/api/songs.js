const express = require("express");

const ctrls = require("../../controllers/songs");
const {ctrlWrapper} = require("../../helpers");


const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));

// router.post("/", validateBody(JoiSongs.createSongSchema), ctrlWrapper(ctrls.add));
// router.post("/create/all", validateBody(JoiSongs.createSongSchema), ctrlWrapper(ctrls.add));
// router.put("/:id", validateBody(addSongSchema), ctrlWrapper(ctrls.updateById));

module.exports = router;