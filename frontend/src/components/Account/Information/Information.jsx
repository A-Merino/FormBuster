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
            <p><strong>Email:</strong> {account.email}</p>
            <p><strong>First Name:</strong> {account.firstName}</p>
            <p><strong>Last Name:</strong> {account.lastName}</p>
            <p><strong>Student ID:</strong> {account.id}</p>
            <div id="password-info">
              <p><strong>Password:</strong> {thePassword}</p>
              <button id="show-password" onClick={switchPasswordVisibility}>{showPass}</button>
            </div>
            {/*<p id="change-password"><Link to="/account/change-password">Change Password</Link></p>*/}
            <p><strong>Major/College:</strong> {account.major}</p>
            {account.role === 'student' &&
            <p><strong>Advisor:</strong> {account.advisor}</p>
        }
        </div>
        </>
    )
}

export default Information
