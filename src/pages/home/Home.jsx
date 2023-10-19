import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import axios from "axios";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { user, setUser } = useUserContext();
  const navigateTo = useNavigate();
  const handleJoinClick = () => {
    setIsJoining(true);
  };

  const handleCreateClick = async () => {
    const response = await axios.post(
      "http://localhost:5000/chat/create-room",
      {
        creator: user.email,
      }
    );
    const { roomId } = response.data;
    setUser({ ...user, roomId });
    navigateTo("/chatroom");
  };

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat/join-room",
        {
          roomId: roomId,
          userEmail: user.email,
        }
      );

      if (response.status === 200) {
        setUser({ ...user, roomId });
        navigateTo(`/chatroom`);
      } else {
        const data = await response.data;
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <div>
        <button onClick={handleJoinClick}>Join Chat Room</button>
        <button onClick={handleCreateClick}>Create Chat Room</button>
      </div>
      {isJoining && (
        <div>
          <input
            type="text"
            placeholder="Enter Chat Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join</button>
        </div>
      )}
    </div>
  );
};

export default Home;
