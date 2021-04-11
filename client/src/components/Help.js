import React,{useEffect} from 'react'
import Navbar from './Navbar'
import './Help.css'
const { Redirect } = require("react-router-dom");

function Help() {

    useEffect(() => {
        window.location.href = "https://github.com/asgaralipq/travel-app";
      }, []);
    
    return (
        <>
        </>
    )
}

export default Help
