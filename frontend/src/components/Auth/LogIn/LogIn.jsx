import { useState } from 'react'
import './LogIn.css'
import {Link, useNavigate} from "react-router"
import User from "./../../User/User.jsx"


function LogIn() {
    const navigate = useNavigate();

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({"email": event.target.email.value,
                                    "password":event.target.password.value})
              })
            .then(data => data.json())
            .then(d => setUser(d))
            .then(() => setSignedIn(true))
            .then(() => navigate("/home"))

    }



    return (
    <>
    <div id="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <label> Email:
                <input/>
            </label>
            <label> Password:
                <input/>
            </label>
            <input type='Submit'/>
        </form>


        <p id='log-note'>If you don't have an account you can <Link to="/register">create one here</Link>.</p>
    </div>
    </>
    )
}

export default LogIn 
