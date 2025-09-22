import { useState, useContext, useEffect } from 'react'
import './FormTracker.css'
import TrackedItem from './TrackedItem/TrackedItem.jsx'
import User from "./../../User/User.jsx"

function FormTracker() {

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // hold the tracked forms for the account
    // const [forms, setForms] = useState([]);

    // get all forms connected to the account
    // useEffect(() => {
    // // fetches all the current forms from database 
    // const fetchForms = async (forms) => {

    //     try {
    //         // for each form string id 
    //         forms.map(async form => {
    //             // get the data of the form
    //             const response = await fetch(`http://localhost:3000/api/getActive`, {
    //                 method :"POST",
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify({id:form})
    //             });
    //             const data = await response.json(); // json the data
    //             setTracks([...tracks, data.form]); // append to end of list
    //         });
    //     } catch (error) {
    //         // if error then print
    //         console.error(error);
    //     }
    // }

    //     fetchForms(account.forms)
        
    // }, []);


  return (
    <>
        <div id="tracker">
            
            <h2>Form Tracker</h2>

            <div id='track-holder'>
            
            {account.forms.length > 0 && account.forms.map((formid) => {
                
                return <TrackedItem key={formid} data={formid}/>
            })}
            </div>

        </div>
    </>
  )
}

export default FormTracker
