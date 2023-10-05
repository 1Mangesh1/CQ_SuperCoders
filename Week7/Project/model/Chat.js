const mongoose = require("mongoose");

const chatMessage = new mongoose.Schema({
  ticketId: String,
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", chatMessage);
