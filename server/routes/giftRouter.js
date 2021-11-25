const express = require('express');
const router = express.Router();
const { getAllGifts, newGift, updateWishlist, newGuestGift, getGuestGifts } = require('../controllers/giftController');

/* GET users listing. */
router.post('/new', newGift) ;
//router.get('/add', newGift) ;
router.post('/add', newGuestGift);
router.get('/guestgifts', getGuestGifts);
router.get('/', getAllGifts);
router.post('/', updateWishlist);

module.exports = router;