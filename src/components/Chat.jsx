import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "./styles/Chat.css";
import AuthContext from "../contexts/AuthContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const chatContainerRef = useRef(null);

  const { URL } = useContext(AuthContext);

  const senderId = "64fa67c8f5d4e9b987654321";
  const receiverId = "64fa67c8f5d4e9b912345678";
  const senderUsername = "alice";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/conversations/${senderId}/${receiverId}`
        );
        setMessages(response.data);

        // Get the receiver's name from the latest message
        const receiverMsg = response.data.find(
          (msg) => msg.senderId === receiverId
        );
        if (receiverMsg) {
          setReceiverName(receiverMsg.senderUsername);
        }

        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      senderId,
      receiverId,
      senderUsername,
      message: newMessage,
    };

    try {
      await axios.post(`${URL}/api/conversations/message`, messageData);

      // Update chat with new message
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

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h3>{receiverName}</h3>
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
