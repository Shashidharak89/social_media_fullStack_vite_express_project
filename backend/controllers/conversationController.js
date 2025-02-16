const Conversation = require("../models/Conversation");

// Create or get an existing conversation
const createOrGetConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Sort IDs to ensure uniqueness regardless of order
    const members = [senderId, receiverId].sort();

    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({ members });

    if (!conversation) {
      // Create a new conversation
      conversation = new Conversation({ members, messages: [] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

// Send a message in an existing conversation or create one if it doesn’t exist
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, senderUsername, message } = req.body;

    // Sort IDs to maintain consistency
    const members = [senderId, receiverId].sort();

    // Find or create a conversation
    let conversation = await Conversation.findOne({ members });

    if (!conversation) {
      conversation = new Conversation({ members, messages: [] });
    }

    // Add message to conversation
    conversation.messages.push({
      senderId,
      senderUsername,
      message,
      timestamp: new Date(),
    });

    await conversation.save();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Sort IDs to match stored format
    const members = [senderId, receiverId].sort();

    // Find conversation
    const conversation = await Conversation.findOne({ members });

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

module.exports = { createOrGetConversation, sendMessage, getMessages };