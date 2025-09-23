// react and fontawesome imports
import { useState, useContext } from 'react'
import {useNavigate} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faUserGear, faUserPen } from '@fortawesome/free-solid-svg-icons'

// module imports
import User from "./../../User/User.jsx"
import './Register.css'

function Register() {

    // create navigator
    const navigate = useNavigate()
    // This var will let us change displays
    const [disp, setDisp] = useState('')

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // create a user variable
    const [daUser, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPassword: '',
        role: '',
        major: '',
        advisor: '',
    });

    // add data to user state variabe
    const handleChange = (e) => {
        setUser({ ...daUser, [e.target.name]: e.target.value })
    }

    // Will submit the user information to backend
    const handleSubmit = async (event) => {
        event.preventDefault();

        // check if passwords match
        if (daUser.confPassword !== daUser.password) {
            alert("Passwords don't match");
            return;
        }

        // register the user information to database
        try {
            daUser.role = disp;
            const response = await fetch(`http://localhost:3000/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(daUser),
            });

            // wait for response
            const data = await response.json();
            // if good go to sign-in
            if (response.ok) {
                alert("Register successful");
                navigate('/sign-in');
            } else {
                alert("Error: " + data.message);
                if (data.status === 400) {
                    return;
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    /* RENDER ------------------------------ */
    if (disp === 'student') {
        return (
        <>
        <div id="reg-box">
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
                <label> First Name:
                    <input value={daUser.firstName} onChange={handleChange} name="firstName" required />
                </label>
                <label> Last Name:
                    <input value={daUser.lastName} onChange={handleChange} name="lastName" required />
                </label>
                <label> Student ID:
                    <input
                        inputMode="numeric"
                        pattern="\d*"
                        minLength="9"
                        maxLength="9"
                        placeholder="9XXXXXXX"
                        value={daUser.id}
                        onChange={handleChange}
                        name="id"
                        required
                    />
                </label>
                <label> Major:
                    <input value={daUser.major} onChange={handleChange} name="major" required />
                </label>
                <label> Advisor:
                    <input value={daUser.advisor} onChange={handleChange} name="advisor" required />
                </label>
                <label> FIT Email:
                    <input placeholder="example@fit.edu" value={daUser.email} onChange={handleChange} name="email" required />
                </label>
                <label> Password:
                    <input type="password" value={daUser.password} onChange={handleChange} name="password" required />
                </label>
                <label> Confirm Password:
                    <input type="password" value={daUser.confPassword} onChange={handleChange} name="confPassword" required/>
                </label>
                <input id="reg-sub" type="Submit"/>
            </form>

            <button id='reg-back-button' onClick={() => setDisp("")}>Return to User Selection</button>

        </div>
        </>
        )
    } else if (disp === 'staff' || disp === 'admin') {
        return (
        <>
        <div id="reg-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label> First Name:
                    <input value={daUser.firstName} onChange={handleChange} name="firstName" required />
                </label>
                <label> Last Name:
                    <input value={daUser.lastName} onChange={handleChange} name="lastName" required />
                </label>
                <label> School ID:
                    <input
                        inputMode="numeric"
                        pattern="\d*"
                        minLength="9"
                        maxLength="9"
                        value={daUser.id}
                        onChange={handleChange}
                        name="id" required
                    />
                </label>
                <label> FIT Email:
                    <input value={daUser.email} onChange={handleChange} name="email" required />
                </label>
                <label> Password:
                    <input type="password" value={daUser.password} onChange={handleChange} name="password" required />
                </label>
                <label> Confirm Password:
                    <input type="password" value={daUser.confPassword} onChange={handleChange} name="confPassword" required/>
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
