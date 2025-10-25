import { useState, useContext, useEffect } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'
import ShowSig from './ShowSig/ShowSig.jsx'
import Warning from './../Warning/Warning.jsx'
import User from "./../../../User/User.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsis,faExclamation } from '@fortawesome/free-solid-svg-icons'


function TrackedItem(props) {
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    // save props as a constant
    const formID = props.data;


    // state variables
    const [ready, setReady] = useState(false);
    const [formName, setFormName] = useState("");
    const [form, setForm] = useState({});
    const [disp, setDisp] = useState(false);
    const [signed, setSign] = useState(false);

    const sigID = formID + "_" + account.id;
   

    useEffect(() => {
        // collects the active form data from api 
        const fetchForm = async () => {
            try {
                // get the data of the form
                const response = await fetch(`http://localhost:3000/api/getActive`, {
                    method :"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:formID})
                });
                const data = await response.json(); // jsonify
                setForm(data.form); // set as state variable
                
                // setDate(new Date() - new Date(form.creationDate))
                setReady(true); // ready to display
            } catch (error) {
                // if error then print
                console.error(error);
            }
        }
        const getSignStatus = async () => {
            try {
                // get the user's signature status of current form
                const response = await fetch(`http://localhost:3000/api/getSig`, {
                    method :"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:sigID})
                });
                const data = await response.json(); // jsonify
                if (data.sig.isSigned === 'unsigned') {
                    setSign(true);
                }                
            } catch (e) {
                console.log(e);
            }
        }

        fetchForm();
        getSignStatus();
        
        
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
            if (data.name[0] === 'P') {
                let sides = data.name.split(" To Take ");
                data.name = sides[0].split(" ")[1] + " -> " + sides[1];
            }
            setFormName(data.name); // set name to state variable
        } catch (e) {
            console.log(e)
        }
    }

    const deleteForm = async () => {
        try {
            const resp = await fetch(`http://localhost:3000/api/deleteForm`, {
                        method :"POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id:formID})
                    })
            const data = await resp.json();
            console.log(data.msg)
        } catch (err) {
            console.log(err);
        }
    }

    let delButton
    if (account.role === 'admin') {
        delButton = <li onClick={deleteForm}><a>Delete Form</a></li>
    }

    let signButton
    let warning
    const time = new Date() - new Date(form.creationDate);
    const days = parseInt(time / (1000 * 60 * 60 * 24))
    if (signed) {
        signButton = <li>
            <Link to={`/sign/${formID}`}>Sign Here</Link></li>
        if (days > 2) {
            warning = <div className="warn-box">
                        <FontAwesomeIcon className='warn' icon={faExclamation}/>
                            <p>Please sign this form! Days since signature required: {days}</p>
                        </div>

        } else {
            warning = <div className="warn-box"></div>
        }
    } else {
        warning = <div className="warn-box"></div>

    }


    const showNav = (e) => {
        setDisp(!disp)
    }

    /* RENDER -------------------------------------------------------------------------------- */
    if (ready) {
        getFormName() // if api call is done, get the form name
    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{formName}</h3>
                    <p className='show-date'><strong>Date Created:</strong> {new Date(form.creationDate).toLocaleString()}</p>
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


                {/*<Warning formID={formID} data={new Date() - new Date(form.creationDate)}/>*/}
                {warning}
                <div className='ellip'>
                <FontAwesomeIcon onClick={showNav} icon={faEllipsis}/>
            {disp && <div className="end-bar">
                <ul>
                    <li>
                        <Link to={`/form/${formID}`}>More Details</Link>
                        
                    </li>
                    {signButton}
                    
                    {delButton}

                </ul>

            </div>
            }
                </div>

            </div>
        </>
    )
    }
}

export default TrackedItem
