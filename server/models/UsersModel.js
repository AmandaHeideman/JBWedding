const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  attending: { type: Boolean },
  alcohol: { type: Boolean },
  diet: { type: String },
  performing: { type: Boolean },
  email: { type: String }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;