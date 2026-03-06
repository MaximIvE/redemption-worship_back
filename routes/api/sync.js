const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlsSongs = require('../../controllers/sync');
const { authenticate, authorizeRole } = require('../../middlewares');


const router = express.Router();

router.get("/songs", authenticate, authorizeRole("editor", "admin"), ctrlWrapper(ctrlsSongs.getNewSongs));
router.get("/songs/:id", authenticate, authorizeRole("editor", "admin"), ctrlWrapper(ctrlsSongs.getNewById));

router.put("/songs", authenticate, authorizeRole("admin"), ctrlWrapper(ctrlsSongs.syncAllDataSongs));
router.put("/songs/:id", authenticate, authorizeRole("admin"), ctrlWrapper(ctrlsSongs.syncDataSongById));

module.exports = router;