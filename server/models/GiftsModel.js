const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  title: { type: String, required: true },
  purchased: { type: Boolean },
  nonPurchasable: { type: Boolean },
  boughtBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

const Gift = mongoose.model('Gifts', giftSchema);
module.exports = Gift;