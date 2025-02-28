import { useState } from 'react'
import './Register.css'
import {useNavigate} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faUserGear, faUserPen } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const navigate = useNavigate()
    // This var will let us change displays
    const [disp, setDisp] = useState('')


    // Will submit the user information to backend
    // Currently only navigates the page to the home page
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/home');
    };


   

    if (disp === 'student') {
        return (
        <>
        <div id="reg-box">
                <h2>Student Registration</h2>
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

                <button id='reg-back-button' onClick={() => setDisp("")}>Return to User Selection</button>

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
                <button id='reg-back-button' onClick={() => setDisp("")}>Return to User Selection</button>

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
                <button id='reg-back-button' onClick={() => setDisp("")}>Return to User Selection</button>

            </div>
        </>
        )       
    } else {
        
        return (
        <>
            <div id="reg-pick">
                <h2>Are you a...</h2>
                <div id="user-list">
                <div className='pick-user' onClick={() => setDisp("student")}>
                    <FontAwesomeIcon className="reg-icon" icon={faUserGraduate} />
                    <h4>Student</h4>
                </div>
                <div className='pick-user' onClick={() => setDisp("staff")}>
                    <FontAwesomeIcon className="reg-icon" icon={faUserPen} />
                    <h4>Advisor</h4>
                </div>
                <div className='pick-user' onClick={() => setDisp("admin")}>
                    <FontAwesomeIcon className="reg-icon" icon={faUserGear} />
                    <h4>Administrator</h4>
                </div>
                </div>
            </div>
        </>
        )
    }
}

export default Register
