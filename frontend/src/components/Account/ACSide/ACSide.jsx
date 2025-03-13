import { useState } from 'react'
import './ACSide.css'

import {Link} from 'react-router'

function ACSide() {

    return (
        <>
        <div id="ac-side">
            <ul>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/account/settings">Settings</Link></li>
            </ul>
        </div>
        </>
    )
}

export default ACSide
