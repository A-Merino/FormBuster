// react imports
import { useState, useContext, useEffect } from 'react'

// component imports
import './FormTracker.css'
import TrackedItem from './TrackedItem/TrackedItem.jsx'
import User from "./../../User/User.jsx"


function FormTracker() {

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    const [forms, setForms] = useState([]);
    const [ready, setReady] = useState(false);

    // useEffect for only if the account type is administrator
    useEffect( () => {

        // get All form IDs
        const getForms = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getAllActive`, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                });
                // wait for response
                const data = await response.json();
                setForms(data.fids);  //set state variables
                setReady(true);
            } catch (er) {
                console.log(er);
            }
        }

        if (account.role === "admin") {
            getForms();
        }
    }, [])

    /* RENDER ------------------------------ */
    // if admin and forms are loaded
    if (ready) {

        return (<>
            <div id="tracker">
                
                <h2>Form Tracker</h2>

                <div id='track-holder'>
                {/* Check if the account has forms, if so then display them */}
                {forms.map((formid) => {
                    
                    return <TrackedItem key={formid} data={formid}/>
                })}
                </div>

            </div>
        </>)
    } else {

        return (<>
            <div id="tracker">
                
                <h2>Form Tracker</h2>

                <div id='track-holder'>
                {/* Check if the account has forms, if so then display them */}
                {account.forms.length > 0 && account.forms.map((formid) => {
                    
                    return <TrackedItem key={formid} data={formid}/>
                })}
                </div>

            </div>
        </>)
    }
}

export default FormTracker
