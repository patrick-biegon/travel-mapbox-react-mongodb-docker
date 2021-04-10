import React from 'react'
import { useStateValue } from '../StateProvider'
const { Redirect } = require("react-router-dom");



/* const Logout = () => {
    const [,dispatch] = useStateValue();
    dispatch({
        type: 'DESTROY_SESSION'
    })
    return (
        <Redirect to='/' />
    )
}*/

function Logout() {
    localStorage.removeItem('token')
    return (
        <Redirect to="/" />
    )
}


export default Logout
