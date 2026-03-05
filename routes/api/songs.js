const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const ctrls = require("../../controllers/songs");
const {ctrlWrapper} = require("../../helpers");
const { JoiSongs } = require("../../models/song");


const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));

router.post("/", authenticate, validateBody(JoiSongs.createManySongsSchema), ctrlWrapper(ctrls.addMany));
router.post("/:id", authenticate, validateBody(JoiSongs.createSongSchema), ctrlWrapper(ctrls.addOne));
router.put("/", authenticate, validateBody(JoiSongs.updateManySongsSchema), ctrlWrapper(ctrls.updateMany));
router.put("/:id", authenticate, validateBody(JoiSongs.updateSongSchema), ctrlWrapper(ctrls.updateOne));

module.exports = router;