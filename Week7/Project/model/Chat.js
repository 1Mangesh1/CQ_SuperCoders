const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  ticketId: String,
  sender: String,
  message: String,
  media: String, // Store the filename for media
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
