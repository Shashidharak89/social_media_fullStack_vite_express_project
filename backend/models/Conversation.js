const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String], // Store user IDs as an array
      required: true,
    },
    messages: [
      {
        senderId: { type: String, required: true },
        senderUsername: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);