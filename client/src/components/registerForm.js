import React, { useState } from "react";
import { register } from "../api";
import { useStateValue } from '../StateProvider';
import './loginForm.css'
const { Redirect } = require("react-router-dom");

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

const loginStyle = {
    backgroundColor: "#808080",
    color: "white",
    padding: "14px 20px 10px 10px",
    borderRadiusTopRight: "7px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
}

const Register = () => {
    var redirect = false;
    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [state, updateState] = useState({
        name: "",
        email: "",
        password: "",
        loading: false,
        errors: {},
        redirect: redirect,
    });



    const handleUpdateName = (event) => {
        updateName(event.target.value)
    }

    const handleUpdateEmail = (event) => {
        updateEmail(event.target.value)
    }

    const handleUpdatePassword = (event) => {
        updatePassword(event.target.value)
    }
    const handleBack = async (event) => {
        updateState({
            loading: false,
            redirect: "/",
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateState({
            loading: true,
        });



        const status = await register(name, email, password)
        if (status) {
            console.log(status);
            updateState({
                loading: false,
                redirect: "/App",
            });
        } else {
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
        <div>
            
            <div className="RegisterForm">
                <div><h2><center>Create New Account</center></h2></div>
                <input style={inputStyle} type="name" placeholder="Enter your Name" value={name} onChange={handleUpdateName}></input>
                <input style={inputStyle} type="email" placeholder="Enter your Email" value={email} onChange={handleUpdateEmail}></input>
                <input style={inputStyle} type="password" placeholder="Enter password" value={password} onChange={handleUpdatePassword}></input>
                <div className="ButtonFlex">
                    <button className="Button1Style" onClick={handleSubmit}>Register</button>
                    <button className="Button2Style" onClick={handleBack}>Log in instead</button>
                </div>
            </div>
        </div>
    )
}

export default Register