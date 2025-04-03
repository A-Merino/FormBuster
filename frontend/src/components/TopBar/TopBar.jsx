import { useState, useContext } from 'react'
import './TopBar.css'
import {Link} from 'react-router'
import User from "./../User/User.jsx"

function TopBar() {


    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    console.log(account)

    return (
        <>
            <div id="top-bar">
                <p>Hello, <Link to="/account">{account.firstName} {account.lastName}</Link></p>
            </div>
        </>
    )
}

export default TopBar
