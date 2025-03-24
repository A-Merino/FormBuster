import { useState } from 'react'
import './Register.css'
import {useNavigate} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faUserGear, faUserPen } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const navigate = useNavigate()
    // This var will let us change displays
    const [disp, setDisp] = useState('')

    const [user, setUser] = useState({
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

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Will submit the user information to backend
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user.confPassword !== user.password) {
            alert("Passwords don't match");
            return;
        }

        try {
            user.role = disp;
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Register successful");
            } else {
                alert("Error: " + data.message);
                if (data.status === 400) {
                    return;
                }
            }
        } catch (error) {
            console.error(error);
        }
        navigate('/home');
    };
   

    if (disp === 'student') {
        return (
        <>
        <div id="reg-box">
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
                <label> First Name:
                    <input value={user.firstName} onChange={handleChange} name="firstName" required />
                </label>
                <label> Last Name:
                    <input value={user.lastName} onChange={handleChange} name="lastName" required />
                </label>
                <label> Student ID:
                    <input
                        inputMode="numeric"
                        pattern="\d*"
                        minLength="9"
                        maxLength="9"
                        placeholder="9XXXXXXX"
                        value={user.id}
                        onChange={handleChange}
                        name="id"
                        required
                    />
                </label>
                <label> Major:
                    <input value={user.major} onChange={handleChange} name="major" required />
                </label>
                <label> Advisor:
                    <input value={user.advisor} onChange={handleChange} name="advisor" required />
                </label>
                <label> FIT Email:
                    <input placeholder="example@fit.edu" value={user.email} onChange={handleChange} name="email" required />
                </label>
                <label> Password:
                    <input type="password" value={user.password} onChange={handleChange} name="password" required />
                </label>
                <label> Confirm Password:
                    <input type="password" value={user.confPassword} onChange={handleChange} name="confPassword" required/>
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
                    <input value={user.firstName} onChange={handleChange} name="firstName" required />
                </label>
                <label> Last Name:
                    <input value={user.lastName} onChange={handleChange} name="lastName" required />
                </label>
                <label> School ID:
                    <input
                        inputMode="numeric"
                        pattern="\d*"
                        minLength="9"
                        maxLength="9"
                        value={user.id}
                        onChange={handleChange}
                        name="id" required
                    />
                </label>
                <label> FIT Email:
                    <input value={user.email} onChange={handleChange} name="email" required />
                </label>
                <label> Password:
                    <input type="password" value={user.password} onChange={handleChange} name="password" required />
                </label>
                <label> Confirm Password:
                    <input type="password" value={user.confPassword} onChange={handleChange} name="confPassword" required/>
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
