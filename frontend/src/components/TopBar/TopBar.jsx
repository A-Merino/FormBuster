// imports
import { useState, useContext } from 'react'
import {Link} from 'react-router'
import User from "./../User/User.jsx"
import './TopBar.css'

function TopBar() {

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    /* RENDER ------------------------*/
    return (
        <>
            <div id="top-bar">
                <p>Hello, <Link to="/account">{account.firstName} {account.lastName}</Link></p>
            </div>
        </>
    )
}

export default TopBar
