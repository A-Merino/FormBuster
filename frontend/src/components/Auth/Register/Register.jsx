import { useState } from 'react'
import './Register.css'
import {useNavigate} from 'react-router'

function Register() {
    const navigate = useNavigate()

    let disp = '';

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/home');
    }


    if (disp === 'student') {
        return (
        <>
        <div id="reg-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label> First Name: 
                        <input/>
                    </label>
                    <label> Last Name: 
                        <input/>
                    </label>
                    <label> Student ID: 
                        <input/>
                    </label>
                    <label> Major: 
                        <input/>
                    </label>
                    <label> Advisor: 
                        <input/>
                    </label>
                    <label> FIT Email: 
                        <input/>
                    </label>
                    <label> Password: 
                        <input/>
                    </label>
                    <label> Confirm Password: 
                        <input/>
                    </label>
                    <input id="reg-sub" type="Submit"/>
                </form>

            </div>
        </>
        )
    } else if (disp === 'staff') {
        return (
        <>
        <div id="reg-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label> First Name: 
                        <input/>
                    </label>
                    <label> Last Name: 
                        <input/>
                    </label>
                    <label> Student ID: 
                        <input/>
                    </label>
                    <label> Major: 
                        <input/>
                    </label>
                    <label> Advisor: 
                        <input/>
                    </label>
                    <label> FIT Email: 
                        <input/>
                    </label>
                    <label> Password: 
                        <input/>
                    </label>
                    <label> Confirm Password: 
                        <input/>
                    </label>
                    <input id="reg-sub" type="Submit"/>
                </form>

            </div>
        </>
        )
    } else if (disp === 'admin') {
        return (
        <>
        <div id="reg-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label> First Name: 
                        <input/>
                    </label>
                    <label> Last Name: 
                        <input/>
                    </label>
                    <label> Student ID: 
                        <input/>
                    </label>
                    <label> Major: 
                        <input/>
                    </label>
                    <label> Advisor: 
                        <input/>
                    </label>
                    <label> FIT Email: 
                        <input/>
                    </label>
                    <label> Password: 
                        <input/>
                    </label>
                    <label> Confirm Password: 
                        <input/>
                    </label>
                    <input id="reg-sub" type="Submit"/>
                </form>

            </div>
        </>
        )       
    } else {
        
        return (
        <>
            <div id="reg-pick">
                <h2>Who are you?</h2>
                <div class='pick-user'>Student</div>
                <div class='pick-user'>Staff</div>
                <div class='pick-user'>Administrator</div>

            </div>
        </>
        )
    }
}

export default Register
