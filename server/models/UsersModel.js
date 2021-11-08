const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  attending: { type: Boolean },
  alcohol: { type: Boolean },
  dietaryRestiction: { type: String },
  performing: { type: Boolean }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;