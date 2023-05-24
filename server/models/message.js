const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;