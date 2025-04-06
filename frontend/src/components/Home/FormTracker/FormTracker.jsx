import { useState, useContext } from 'react'
import './FormTracker.css'
import TrackedItem from './TrackedItem/TrackedItem.jsx'
import User from "./../../User/User.jsx"

function FormTracker() {

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    const f = {
        "forms": [{
            "id":1,
            "name": "Ferpa Form",
            "creationDate": "April 6, 2025",
            "signatures": [{
                "isSigned": "signed"
            },{
                "isSigned": "unsigned"
            },{
                "isSigned": "rejected"
            },{
                "isSigned": "na"
            }]},{
            "id":2,
            "name": "Other form",
            "creationDate": "April 6, 2025",
            "signatures": [{
                "isSigned": "signed"
            },{
                "isSigned": "unsigned"
            },{
                "isSigned": "rejected"
            },{
                "isSigned": "na"
            }]}
        ]}
        

  return (
    <>
        <div id="tracker">
            
            <h2>Form Tracker</h2>

            <div id='track-holder'>
            {f.forms.map((form) => {
                console.log(form);
                return <TrackedItem key={form.id} data={form}/>
            }
            )

            }
            </div>

        </div>
    </>
  )
}

export default FormTracker
