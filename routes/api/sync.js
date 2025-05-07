const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlsSongs = require('../../controllers/sync')


const router = express.Router();

router.get("/songs", ctrlWrapper(ctrlsSongs.getNewSongs));
router.get("/songs/:id", ctrlWrapper(ctrlsSongs.getNewById));


module.exports = router;