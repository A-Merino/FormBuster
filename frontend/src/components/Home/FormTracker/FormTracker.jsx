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


    /* RENDER ------------------------------ */
    return (
    <>
        <div id="tracker">
            
            <h2>Form Tracker</h2>

            <div id='track-holder'>
            {/* Check if the account has forms, if so then display them */}
            {account.forms.length > 0 && account.forms.map((formid) => {
                
                return <TrackedItem key={formid} data={formid}/>
            })}
            </div>

        </div>
    </>
  )
}

export default FormTracker
