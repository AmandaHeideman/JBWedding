const express = require('express');
const router = express.Router();
const { getAllGifts, newGift, updateWishlist } = require('../controllers/giftController');

/* GET users listing. */
router.get('/add', newGift) ;
router.get('/', getAllGifts);
router.post('/', updateWishlist);

module.exports = router;