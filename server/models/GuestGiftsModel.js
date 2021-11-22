const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestGiftSchema = new Schema({
  title: { type: String, required: true }
});

const GuestGift = mongoose.model('GuestGifts', guestGiftSchema);
module.exports = GuestGift;