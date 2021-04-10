import React, { useState } from "react"
import { login } from "../api"
import { useStateValue } from '../StateProvider';
const { Redirect } = require("react-router-dom");


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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={handleUpdateEmail}></input>
                <input type="password" value={password} onChange={handleUpdatePassword}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login