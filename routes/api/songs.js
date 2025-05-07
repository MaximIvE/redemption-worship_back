const express = require("express");
const { validateBody } = require("../../middlewares");
const ctrls = require("../../controllers/songs");
const {ctrlWrapper} = require("../../helpers");
const { JoiSongs } = require("../../models/song");

JoiSongs
const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));
validateBody
router.post("/", validateBody(JoiSongs.createManySongsSchema), ctrlWrapper(ctrls.addMany));
router.post("/one", validateBody(JoiSongs.createSongSchema), ctrlWrapper(ctrls.add));
// router.put("/:id", validateBody(addSongSchema), ctrlWrapper(ctrls.updateById));

module.exports = router;