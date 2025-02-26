import { useState } from 'react'
import './LogIn.css'
import {Link, useNavigate} from "react-router"

function LogIn() {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/home');
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
