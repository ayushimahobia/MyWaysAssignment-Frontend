import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useUserContext();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log(data);
        setUser({ email: data.email, username: data.username });
        navigateTo("/home");
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered yet? <Link to="/register">Click here to register</Link>
      </p>
    </div>
  );
};

export default Login;
