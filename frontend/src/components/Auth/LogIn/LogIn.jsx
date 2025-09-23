// imports
import { useState, useContext } from 'react'
import {Link, useNavigate} from "react-router"
import User from "./../../User/User.jsx"
import './LogIn.css'


function LogIn() {
    // create naviagtor
    const navigate = useNavigate();

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // on submit we conduct a sign-in attempt
    const handleSubmit = (event) => {
        event.preventDefault(); 
        // Post the information
        fetch(`http://localhost:3000/api/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({"email": event.target.email.value,
                                    "password":event.target.password.value})
        })
        // jsonify our response
        .then(data => data.json())
        .then(d => {
            // if incorrect then throw alert
            if (d.message === "Incorrect Password") {
                alert("Incorrect Password")
            } else {
                setAccount(d)
            }
        })
        // say we are signed in and go to /home
        .then(() => setSignedIn(true))
        .then(() => navigate("/home"))

    }

    /* RENDER ------------------------------ */
    return (
    <>
    <div id="login-box">
        
        <h2>Log In</h2>

        <form onSubmit={handleSubmit}>
            <label> Email:
                <input name="email" required/>
            </label>
            <label> Password:
                <input type="password" name="password" required/>
            </label>
            <input type='Submit'/>
        </form>

        <p id='log-note'>If you don't have an account you can <Link to="/register">create one here</Link>.</p>
    </div>
    </>
    )
}

export default LogIn 
