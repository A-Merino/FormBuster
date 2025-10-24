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

    // save props
    const time = props.data;
    // calculate the days from difference in milliseconds 
    //                     mil     sec   min  hour day
    const days = parseInt(time / (1000 * 60 * 60 * 24))



    /* RENDER ------------------------------ */
    if (days > 2) {

        return (
            <>
            <div className="warn-box">
            <FontAwesomeIcon className="warn" icon={faExclamation}/>
            <p>It has been {days} days since form creation</p>
            </div>

            </>
        )
    }
}

export default Warning
