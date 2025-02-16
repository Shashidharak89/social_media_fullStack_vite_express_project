import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "./styles/Chat.css";
import AuthContext from "../contexts/AuthContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const chatContainerRef = useRef(null);
  const { URL, userId,reciverId } = useContext(AuthContext);

  // Assign senderId and receiverId dynamically
  const senderId = userId;
  const receiverId = reciverId; // Modify to dynamically get from props or state
  const senderUsername = "alice"; // You can dynamically get this if needed

  // Wait for userId to be available before fetching messages
  useEffect(() => {
    if (userId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${URL}/api/conversations/${senderId}/${receiverId}`
          );
          if (response.data.length > 0) {
            setMessages(response.data);
            setConversationId(response.data[0]._id);

            const receiverMsg = response.data.find(
              (msg) => msg.senderId === receiverId
            );
            if (receiverMsg) {
              setReceiverName(receiverMsg.senderUsername);
            }
          } else {
            setMessages([]);
            setConversationId(null);
          }
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
      setIsLoading(false); // Data is ready
    }
  }, [userId]); // Only trigger when userId changes

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      // If no conversation exists, create one
      if (!conversationId) {
        const convResponse = await axios.post(`${URL}/api/conversations`, {
          senderId,
          receiverId,
        });
        setConversationId(convResponse.data._id);
      }

      // Send the message in the conversation
      const messageData = {
        senderId,
        receiverId,
        senderUsername,
        message: newMessage,
      };

      await axios.post(`${URL}/api/conversations/message`, messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...messageData,
          _id: Date.now(),
          timestamp: new Date().toISOString(),
        },
      ]);

      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Render loading state until userId is available
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h3>{receiverName || "Chat"}</h3>
      </div>
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${
              msg.senderId === senderId ? "sent" : "received"
            }`}
          >
            <div className="message-text">{msg.message}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
