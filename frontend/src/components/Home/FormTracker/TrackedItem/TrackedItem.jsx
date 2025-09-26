import { useState, useContext, useEffect } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'
import ShowSig from './ShowSig/ShowSig.jsx'
import Warning from './../Warning/Warning.jsx'
import User from "./../../../User/User.jsx"

function TrackedItem(props) {
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // save props as a constant
    const formid = props.data;

    // state variables
    const [ready, setReady] = useState(false);
    const [formName, setFormName] = useState("");
    const [form, setForm] = useState({});

    useEffect(() => {
        // collects the active form data from api 
        const fetchForm = async (formid) => {
            try {
                // get the data of the form
                const response = await fetch(`http://localhost:3000/api/getActive`, {
                    method :"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:formid})
                });
                const data = await response.json(); // jsonify
                setForm(data.form); // set as state variable
                setReady(true); // ready to display
            } catch (error) {
                // if error then print
                console.error(error);
            }
        }
        
        fetchForm(formid);
        
    },[])
    
    // Gets the Form name from the database, using the form ID
    const getFormName = async () => {
        try {
            // get data from api call
            const response = await fetch(`http://localhost:3000/api/getFormName`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formid: form.formType})
            });
            const data = await response.json();
            setFormName(data.name) // set name to state variable
        } catch (e) {
            console.log(e)
        }
    }

    const deleteForm = async () => {
        try {
            const resp = await fetch(`http://localhost:3000/api/deleteForm`, {
                        method :"POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id:formid})
                    })
            const data = await resp.json();
            console.log(data.msg)
        } catch (err) {
            console.log(err);
        }
    }

    let delButton
    if (account.role === 'admin') {
        delButton = <button onClick={deleteForm} className="deleter">Delete Form</button>
    }

    /* RENDER ------------------------------ */
    if (ready) { 
        getFormName() // if api call is done, get the form name
    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{formName}</h3>
                    <p>Date Created: {new Date(form.creationDate).toLocaleString()}</p>
                </div>

                <div className="signatures">
                {
                    // Go through each signature and return the node
                    form.signatures.map((sign) => {
                        return <ShowSig data={sign} key={sign}/>
                    })
                }
                </div>

                {/*Here is where the exclamation mark thingy is 
                    Maybe we use some type of time comparison function
                    as well as if you are a user who hasn't signed*/}
                <Warning data={new Date() - new Date(form.creationDate)}/>
                {delButton}

                <Link to={`/form/${formid}`}>More Details</Link>
            </div>
        </>
    )
    }
}

export default TrackedItem
