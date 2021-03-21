import React, { useState } from "react"
import login from "../api"

const Login = ()=> {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const handleUpdateEmail = (event) => {
        updateEmail(event.target.value)
    }

    const handleUpdatePassword = (event) => {
        updatePassword(event.target.value)
    }

    const handleSubmit = (event) => {
        const status = login(email, password)
        if(status){
            // Code you want to run after login is successful.
        } else {
            // Run if login failed.
        }
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