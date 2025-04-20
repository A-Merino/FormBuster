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
    const [tracks, setTracks] = useState([]);

    // get all forms connected to the account
    useEffect(() => {
        const fetchForms = async (forms) => {

                try {
                    // for each form string id 
                    forms.map(async form => {
                        // get the data of the form
                        const response = await fetch(`http://localhost:3000/api/getActive`, {
                            method :"POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id:form})
                        });
                        // json the data
                        const data = await response.json();
                        // append to end of list
                        setTracks([...tracks, data.form]);
                    }
                    );
                } catch (error) {
                    // if error then print
                    console.error(error);
                }
        }
        // call this for all forms
        fetchForms(account.forms);
    }, []);


  return (
    <>
        <div id="tracker">
            
            <h2>Form Tracker</h2>

            <div id='track-holder'>
            
            {tracks.map((form) => {
                
                return <TrackedItem key={form.id} data={form}/>
            })}
            </div>

        </div>
    </>
  )
}

export default FormTracker
