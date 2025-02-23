import { useState } from 'react'
import './LogIn.css'
import {Link} from "react-router"

function LogIn() {

    return (
    <>
        <div id="login-box">
            <h2>Log In</h2>
            <form>
                <label> Email: 
                    <input/>
                </label>
                <label> Password: 
                    <input/>
                </label>
            </form>


            <p id='log-note'>If you don't have an account you can <Link to="/register">create one here</Link>.</p>
        </div>
    </>
    )
}

export default LogIn 
