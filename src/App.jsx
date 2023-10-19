import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import { UserProvider } from "./UserContext";
import ChatRoom from "./pages/Chatroom/Chatroom";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chatroom" element={<ChatRoom />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
