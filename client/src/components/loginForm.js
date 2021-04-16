import React, { useState } from "react"
import { login } from "../api"
import { useStateValue } from '../StateProvider';
import './loginForm.css'
const { Redirect } = require("react-router-dom");


const logInStyle={
  backgroundColor: "beige",
  padding: "2rem",
  boxShadow: "0 0 5px 2px rgb(164, 150, 150)",
  borderRadius: "2rem",
  position: "absolute",
  width: "50vw",
  height: "35vh",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",

  margin: "auto",

}

const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  display: "inline-block",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  borderRadius: "7px",
}

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "14px 20px 10px 10px",
  margin: "8px 0",
  border: "none",
  cursor: "pointer",
  width: "100%",
  borderRadius: "7px",
}

const RegisterStyle = {
  backgroundColor: "#808080",
  color: "white",
  padding: "14px 20px 10px 10px",
  margin: "8px 0",
  border: "none",
  cursor: "pointer",
  width: "100%",
  borderRadius: "7px",
}

const Login = () => {
  var redirect = false;
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [state, updateState] = useState({
    email: "",
    password: "",
    loading: false,
    errors: {},
    redirect: redirect,
  });

  const handleUpdateEmail = (event) => {
    updateEmail(event.target.value)
  }

  const handleUpdatePassword = (event) => {
    updatePassword(event.target.value)
  }

  const handleRegister = async (event) => {
    updateState({
      loading: false,
      redirect: "/Register",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateState({
      loading: true,
    });
    const status = await login(email, password)
    if (status) {
      // Code you want to run after login is successful.
      console.log(status);
      updateState({
        loading: false,
        redirect: "/App",
      });


    } else {
      // Run if login failed.
      console.log(status);
      updateState({
        errors: "Invalid Data",
        loading: false,
      });
    }
  }
  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  if (localStorage.getItem("token")) {
    return <Redirect to="/App" />;
  }

  return (
      <div className="LogInForm" >
        <div ><h2><center>Sign in</center></h2></div>
        <input style={inputStyle} required type="email" placeholder="Email" value={email} onChange={handleUpdateEmail}></input>
        <input style={inputStyle} required type="password" placeholder="Password" value={password} onChange={handleUpdatePassword}></input>
        <div className="ButtonFlex">
          <button className="Button1Style" onClick={handleSubmit}>Login</button>
          <button className="Button2Style" onClick={handleRegister}>Create Account</button>
        </div>
      </div>
  )
}

export default Login