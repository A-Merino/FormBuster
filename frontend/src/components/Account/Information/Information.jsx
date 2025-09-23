// imports
import { useState, useContext } from 'react'
import { Link } from 'react-router'
import ACSide from "./../ACSide/ACSide.jsx"
import User from "./../../User/User.jsx"
import './Information.css'

function Information() {
    // collect user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // passd states
    const [showPass, setEn] = useState('Show Password');
    const [thePassword, setPass] = useState('*********');


    // Here we would also switch boolean in database for user
    const switchPasswordVisibility = (event) => {
        event.preventDefault();
        // switch visibility
        if (showPass === "Show Password") {
            setEn("Hide Password");
            setPass(account.password)  // DECRYPT HERE, ADD FUNCTION
        } else {
            setEn("Show Password");
            setPass('*********')
        }
    }


    /* RENDER ------------------------------ */
    return (
        <>
        <ACSide/>
        <div id="information-div">
            <h1>Account Information</h1>
            <h3>Email: {account.email}</h3>
            <h3>First Name: {account.firstName}</h3>
            <h3>Last Name: {account.lastName}</h3>
            <h3>Student ID: {account.id}</h3>
            <div id="password-info">
              <h3>Password: {thePassword}</h3>
              <button id="show-password"onClick={switchPasswordVisibility}>{showPass}</button>
            </div>
            <p id="change-password"><Link to="/account/change-password">Change Password</Link></p>
            <h4>Major: {account.major}</h4>
            <h4>Advisor: {account.advisor}</h4>
        </div>
        </>
    )
}

export default Information
