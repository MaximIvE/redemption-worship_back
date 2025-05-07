const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlsSongs = require('../../controllers/sync')


const router = express.Router();

router.post("/songs", ctrlWrapper(ctrlsSongs.getNewSongs));


module.exports = router;