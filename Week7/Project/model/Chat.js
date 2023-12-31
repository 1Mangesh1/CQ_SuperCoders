// Chat.js
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  ticketId: String,
  sender: String,
  message: String,
  media : String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
