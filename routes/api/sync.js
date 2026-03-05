const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlsSongs = require('../../controllers/sync');
const { authenticate } = require('../../middlewares');


const router = express.Router();

router.get("/songs", ctrlWrapper(ctrlsSongs.getNewSongs));
router.get("/songs/:id", ctrlWrapper(ctrlsSongs.getNewById));

router.put("/songs", authenticate, ctrlWrapper(ctrlsSongs.syncAllDataSongs));
router.put("/songs/:id", authenticate, ctrlWrapper(ctrlsSongs.syncDataSongById));

module.exports = router;