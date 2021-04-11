import React, { useState } from "react"
import { login } from "../api"
import { useStateValue } from '../StateProvider';
const { Redirect } = require("react-router-dom");

const inputStyle = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  }
  
const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px 10px 10px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
  }

const RegisterStyle = {
    backgroundColor: "#808080",
    color: "white",
    padding: "14px 20px 10px 10px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
  }

const Login = ()=> {
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
        if(status){
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
        <div style ={{padding:'30%', paddingTop:'10%'}} >
            <div style ={{paddingLeft:'45%', paddingBottom:'5%'}}><h2>Login</h2></div>
                <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={handleUpdateEmail}></input>
                <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={handleUpdatePassword}></input>
                <div style={{display:'flex'}}>
                <input style={buttonStyle} type="submit" onClick={handleSubmit}></input>
                <button style={RegisterStyle}  onClick={ handleRegister}>Register</button>
                </div>
        </div>
    ) 
}

export default Login