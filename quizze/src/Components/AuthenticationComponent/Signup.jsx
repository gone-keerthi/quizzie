import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  clearForm,
} from "../../Actions/UserSlice";

// import Login from "./Login";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [error, setError] = useState(null); // To hold error messages
  const [success, setSuccess] = useState(null); // To hold success messages

  const handleSignup = async (event) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make POST request to the server
      const response = await axios.post("http://localhost:5000/users/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      // const userdata = response.config.data;;
      // console.log(userdata);
      // Clear the form and set success message
      dispatch(clearForm());
      setSuccess(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="signUpComponent">
        <div className="signUpComponentContainer">
          <h1>QUIZZIE</h1>
          <div className="signup-form-btn-group">
            <button>Sign Up</button>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
          <form className="signup-form" onSubmit={handleSignup}>
            <div className="signup-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                required
              />
            </div>
            <div className="signup-form-group">
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
            <div className="signup-form-group">
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
            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Signup;
