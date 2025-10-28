//imports 
import { useState } from 'react';
import {useLocation} from 'react-router';
import './ACSide.css'
import {Link} from 'react-router'

function ACSide() {
    const acPage = useLocation().pathname.split('/').at(-1);

    let links;
    if (acPage === 'settings') {
        links = <>
            <Link to="/account">Account</Link>
            <Link class='active-link' to="/account/settings">Settings</Link>
        </>
    } else {
        links = <>
            <Link class='active-link' to="/account">Account</Link>
            <Link to="/account/settings">Settings</Link>
        </>

    }



    /* RENDER ------------------------------ */
    return (
        <>
        <div id="ac-side">
            
            {links}
            
        </div>
        </>
    )
}

export default ACSide
