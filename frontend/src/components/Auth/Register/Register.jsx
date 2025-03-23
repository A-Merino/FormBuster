import { useState } from 'react'
import './Register.css'
import {useNavigate} from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faUserGear, faUserPen } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const navigate = useNavigate()
    // This var will let us change displays
    const [disp, setDisp] = useState('')


    

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


   

    if (disp === 'student') {
        return (
        <>
        <div id="reg-box">
                <h2>Student Registration</h2>
                <form onSubmit={studentSubmit}>
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
