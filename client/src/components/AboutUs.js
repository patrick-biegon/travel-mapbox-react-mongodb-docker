import React from 'react'
import Navbar from './Navbar'
import './AboutUs.css'

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="Title">
                <h1>Contact Us At</h1>
            </div>
            <div className="First">
                <h3>Asgar Ali Qureshi</h3>
                E-Mail: asgaralipq@gmail.com
                <br></br>
                <a href="https://github.com/asgaralipq/">Github</a>


            </div>
            <div className="Second">
                <h3>Nimish</h3>
                E-Mail: nimish@gmail.com
                <br></br>
                <a href="https://github.com/nimish1001/">Github</a>
            </div>
        </>
    )
}

export default AboutUs
