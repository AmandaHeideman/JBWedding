const express = require('express');
const router = express.Router();
const { getAllGifts, newGift } = require('../controllers/giftController');

/* GET users listing. */
router.get('/add', newGift) ;
router.get('/', getAllGifts);

module.exports = router;