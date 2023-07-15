import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidEmail(e.target.value)) {
      toast.error("Invalid email entered");
      return;
    }
    if (email.length === 0) {
      toast.error("Please enter email");
      return;
    }
    if (pass.length === 0) {
      toast.error("Please enter password");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        pass,
      });
      if (response.data.success) {
        navigate("/home");
      } else {
        if (response.data.message === "Email not found") {
          toast.error("Email not registered");
          return;
        }
        if (response.data.message === "Incorrect password") {
          toast.error("Incorrect password");
          return;
        } else {
          toast.error("An error occurred");
          return;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isValidEmail(e.target.value)) {
      toast.error("Invalid email entered");
      return;
    }
    if (email.length === 0) {
      toast.error("Please enter email");
      return;
    }
    if (pass.length === 0) {
      toast.error("Please enter password");
      return;
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password: </label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <div className="butn-cont">
          <button type="submit">Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
