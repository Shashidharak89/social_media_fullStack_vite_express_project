const express = require("express");
const {
  createOrGetConversation,
  sendMessage,
  getMessages,
} = require("../controllers/conversationController");

const router = express.Router();

// Create or get a conversation
router.post("/", createOrGetConversation);

// Send a message
router.post("/message", sendMessage);

// Get messages between two users
router.get("/:senderId/:receiverId", getMessages);

module.exports = router;