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
        role: '',
        major: '',
        advisor: '',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    

    // Submits student data to backend to register 
    const studentSubmit = (event) => {
    event.preventDefault();
    // post to api
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // send data from form
        body: JSON.stringify({
          'fName':event.target.fName.value,
          'lName': event.target.lName.value,
          'sid': event.target.studentID.value,
          "email": event.target.email.value,
          'type': 'student',
          'major': event.target.major.value,
          'advisor': event.target.advisor.value,
          "password":event.target.password.value})
      })
    .then(data => data.json())
    .then(d => {
      if (d.message === "error"){
        incorrectForm = true;
      } else {
        incorrectForm = false;
      }
      setUser(d)})
    .then(() => setSignedIn(true))
    .then(() => navigate("/sign-in")) // go to sign in after registering to actually sign in

    }

      // when submitted
  const facultySubmit = (event) => {
    event.preventDefault();
    // post to api
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // send data from form
        body: JSON.stringify({
          'fName':event.target.fName.value,
          'lName': event.target.lName.value,
          'sid': event.target.schoolID.value,
          "email": event.target.email.value,
          'type': 'faculty',
          'major': null,
          'advisor': null,
          "password":event.target.password.value})
      })
    .then(data => data.json())
    .then(d => {
      if (d.message === "error"){
        incorrectForm = true;
      } else {
        incorrectForm = false;
      }
      setUser(d)})
    .then(() => setSignedIn(true))
    .then(() => navigate("/sign-in")) // go to sign in after registering to actually sign in

    }

      // when submitted
    const adminSubmit = (event) => {
    event.preventDefault();
    // post to api
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // send data from form
        body: JSON.stringify({
          'fName':event.target.fName.value,
          'lName': event.target.lName.value,
          'sid': event.target.schoolID.value,
          "email": event.target.email.value,
          'type': 'admin',
          'major': null,
          'advisor': null,
          "password":event.target.password.value})
      })
    .then(data => data.json())
    .then(d => {
      if (d.message === "error"){
        incorrectForm = true;
      } else {
        incorrectForm = false;
      }
      setUser(d)})
    .then(() => setSignedIn(true))
    .then(() => navigate("/sign-in")) // go to sign in after registering to actually sign in

    }

    // Will submit the user information to backend
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Register successful");
            } else {
                alert("Error: " + data.message);
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
                <form onSubmit={studentSubmit}>
                    <label> First Name: 
                        <input value={user.firstName} onChange={handleChange} name="firstName" required />
                    </label>
                    <label> Last Name: 
                        <input value={user.lastName} onChange={handleChange} name="lastName" required />
                    </label>
                    <label> Student ID: 
                        <input type="number" value={user.id} onChange={handleChange} name="id" required />
                    </label>
                    <label> Major: 
                        <input value={user.major} onChange={handleChange} name="major" required />
                    </label>
                    <label> Advisor: 
                        <input value={user.advisor} onChange={handleChange} name="advisor" required />
                    </label>
                    <label> FIT Email: 
                        <input value={user.email} onChange={handleChange} name="email" required />
                    </label>
                    <label> Password: 
                        <input value={user.password} onChange={handleChange} name="password" required />
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
                <form onSubmit={facultySubmit}>
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
                <form onSubmit={adminSubmit}>
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
