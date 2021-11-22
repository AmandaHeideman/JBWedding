const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  title: { type: String, required: true },
  purchased: { type: Boolean, required: true }
});

const Gift = mongoose.model('Gifts', giftSchema);
module.exports = Gift;