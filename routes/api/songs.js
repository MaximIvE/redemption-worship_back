const express = require("express");
const { validateBody, authenticate, authorizeRole } = require("../../middlewares");
const ctrls = require("../../controllers/songs");
const {ctrlWrapper} = require("../../helpers");
const { JoiSongs } = require("../../models/song");


const router = express.Router();

router.get("/", ctrlWrapper(ctrls.getAll));
router.get("/:id", ctrlWrapper(ctrls.getById));

router.post("/", authenticate, authorizeRole("admin"), validateBody(JoiSongs.createManySongsSchema), ctrlWrapper(ctrls.addMany));
router.post("/:id", authenticate, authorizeRole("editor", "admin"), validateBody(JoiSongs.createSongSchema), ctrlWrapper(ctrls.addOne));
router.put("/", authenticate, authorizeRole("admin"), validateBody(JoiSongs.updateManySongsSchema), ctrlWrapper(ctrls.updateMany));
router.put("/:id", authenticate, authorizeRole("editor", "admin"), validateBody(JoiSongs.updateSongSchema), ctrlWrapper(ctrls.updateOne));

module.exports = router;