import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { FaRobot } from 'react-icons/fa';
import './style.css';


const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Hello! How can I help you?" },
      ]);
    }, 1000);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {/* Chat Icon */}
      {!isOpen && (
        <button 
            onClick={toggleChat} 
             style={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                zIndex: 9999,
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                animation: 'pulse 2s infinite, bounce 2s infinite'
            }}
            >
            <FaRobot size={30} color="white" />
            </button>

      )}
{/* Chat Window */}
      {isOpen && (
  <div
    className="card shadow-lg"
    style={{
      width: 320,
      height: 450,
      borderRadius: 20,
      backgroundColor: "#1f1f1f", // light black/dark bg
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      animation: "fadeIn 0.3s ease",
    }}
  >
    {/* Header */}
    <div
      className="d-flex justify-content-between align-items-center p-3 "
      style={{
        background: "#1d1b1bff",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
      }}
    >
      <span>🤖 AI Assistant</span>
      <button
        onClick={toggleChat} className="close-btn"
        >
        <X size={20} />
      </button>
    </div>

    {/* Messages */}
    <div
      className="flex-grow-1 p-3"
      style={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {messages.map((msg, i) => (
        <div
            key={i}
            className="p-2"
            style={{
            maxWidth: "75%",
            alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
            backgroundColor: msg.from === "user" ? "rgba(255,255,255,0.1)" : "transparent", // bot msg no bg
            color: msg.from === "user" ? "#fff" : "#fff", // bot text green
            borderRadius: msg.from === "user" ? 12 : 0, // only user has rounded bubble
            wordBreak: "break-word",
           
            padding: msg.from === "user" ? "8px 12px" : "4px 0", // tighter spacing for bot
            fontWeight: msg.from === "bot" ? "500" : "normal",
            }}
        >
            {msg.text}
        </div>
        ))}

    </div>

    {/* Footer */}
    <div
      className="d-flex p-2 gap-2"
      style={{
        backgroundColor: "#2c2c2c",
        borderTop: "1px solid #333",
      }}
    >
      <input
        type="text"
        className="form-control chat-input"
         style={{
          borderRadius: 12,
          backgroundColor: "#3a3a3a",
          color: "#ffffff",
          border: "none",
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
       
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="btn btn-gradient"
        onClick={sendMessage}
        style={{
          background: "#fff",
          border: "none",
          color: "#000",
          borderRadius: 12,
        }}
      >
        <Send size={18} />
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ChatBot;
