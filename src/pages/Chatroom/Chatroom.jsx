import React, { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext";
import io from "socket.io-client";

const ChatRoom = () => {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //   const socket = io("http://localhost:5000"); // Replace with your server URL

  //   useEffect(() => {
  //     socket.emit("joinRoom", user.roomId, user.email);

  //     socket.on("message", (message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, [user]);

  const handleSendMessage = () => {
    socket.emit("chatMessage", user.roomId, user.email, newMessage);
    setNewMessage("");
  };

  return (
    <>
      <div>
        <h2>Chat Room</h2>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
