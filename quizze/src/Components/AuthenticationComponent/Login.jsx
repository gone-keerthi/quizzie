import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, clearForm } from "../../Actions/UserSlice";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast';

// import styles
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null); // To hold error messages
  const [success, setSuccess] = useState(null); // To hold success messages

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      //Make a Post request to the server
      const response = await axios.post("http://localhost:5000/users/login", {
        email: user.email,
        password: user.password,
      });
      const { token, userId, userName } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
        
      console.log("Token set:", token);
      console.log("User name set:", userName);
      console.log("User ID set:", userId);


      dispatch(clearForm());
      setSuccess(response.data.message);
      setError(null);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="LoginComponent">
        <div className="loginComponentContainer">
          <h1>QUIZZIE</h1>
          <div className="login-form-btn-group">
            <Link to="/">
              <button>Sign Up</button>
            </Link>
            <button>Log In</button>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
          {error && <p className="error">{error}
            <Toaster />
            </p>}
          {success && <p className="success">{success} <Toaster /></p>}
        </div>
      </div>
    </>
  );
};

export default Login;
