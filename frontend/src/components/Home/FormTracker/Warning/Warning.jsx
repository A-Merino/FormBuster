// imports
import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router'
import './Warning.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamation } from '@fortawesome/free-solid-svg-icons'
import User from "./../../../User/User.jsx"

function Warning(props) {
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    const [signed, setSign] = useState(false);

    // save props
    const sigID = props.formID + "_" + account.id;
    const time = props.data;
    // calculate the days from difference in milliseconds 
    //                     mil     sec   min  hour day
    const days = parseInt(time / (1000 * 60 * 60 * 24))

    useEffect(() => {
        const getSignStatus = async () => {
            try {
                // get the user's signature status of current form
                const response = await fetch(`http://localhost:3000/api/getSig`, {
                    method :"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:sigID})
                });
                const data = await response.json(); // jsonify
                console.log(data);
                if (data.sig.isSigned === 'unsigned') {
                    setSign(true);
                }                
            } catch (e) {
                console.log(e);
            }
        }
        getSignStatus()
    }, []);

    console.log(days, signed)

    /* RENDER ------------------------------ */
    if (days > 2 && signed) {

        return (
            <>
            <div className="warn-box">
            <FontAwesomeIcon className="warn" icon={faExclamation}/>
            <p>It has been {days} days since form creation</p>
            </div>
            <Link to={`/sign/${props.formid}`}>Sign Here</Link>

            </>
        )
    } else if (signed) {
        return (
            <Link to={`/sign/${props.formid}`}>Sign Here</Link>
            )

    }
}

export default Warning
