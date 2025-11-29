// react imports
import { useState, useContext, useEffect } from 'react'

// component imports
import './FormTracker.css'
import TrackedItem from './TrackedItem/TrackedItem.jsx'
import User from "./../../User/User.jsx"


function FormTracker(props) {

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
                    headers: {'Content-Type': 'application/json'},
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


    let type = props.ftype;
    if (type === 'Tracked') {
        type = "Pending"
    } 



    /* RENDER ------------------------------ */
    // if admin and forms are loaded

    // administrator forms
    if (ready) {

        return (<>

                {/* Check if the account has forms, if so then display them */}
                <div id='track-holder'>
                
                    {forms.map((formid) => {
                        
                        return <TrackedItem key={formid} data={formid} ftype={type}/>
                    })}
        
                </div>
        </>)
    }else { // student/staff forms
        return (<>
                

                {/* Check if the account has forms, if so then display them */}
                <div id='track-holder'>
                
                    {account.forms.map((formid) => {
                        
                        return <TrackedItem key={formid} data={formid} ftype={type}/>
                    })}
                
                </div>
        </>)
    }
}

export default FormTracker
