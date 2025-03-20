import { useState } from 'react'
import './Information.css'
import ACSide from "./../ACSide/ACSide.jsx"

import { Link } from 'react-router'

function Information(props) {

  const [showPass, setEn] = useState('Show Password');

  // Here we would also switch boolean in database for user
  const switchPasswordVisibility = (event) => {
    event.preventDefault();

    if (showPass === "Show Password") {
      setEn("Hide Password");
    } else {
      setEn("Show Password");
    }
  }

  return (
    <>
      <ACSide/>
      <div id="information-div">
        <h1>Account Information</h1>
        <h3>Email: jdoe2025@my.fit.edu</h3>
        <h3>First Name: John</h3>
        <h3>Last Name: Doe</h3>
        <h3>Student ID: 900000000</h3>
        <div id="password-info">
          <h3>Password: *********</h3>
          <button id="show-password"onClick={switchPasswordVisibility}>{showPass}</button>
        </div>
        <p id="change-password"><Link to="/account/change-password">Change Password</Link></p>
        <h4>Major: Computer Science</h4>
        <h4>Advisor: Dr. Chan</h4>
      </div>
    </>
  )
}

export default Information
