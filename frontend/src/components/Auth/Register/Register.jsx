import { useState } from 'react'
import './Register.css'
import {useNavigate} from 'react-router'

function Register() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  }


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
}

export default Register
