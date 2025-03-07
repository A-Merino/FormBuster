import { useState } from 'react'
import './TopBar.css'
import {Link} from 'react-router'


function TopBar() {

    return (
        <>
            <div id="top-bar">
                <p>Hello, <Link to="/settings">User Name</Link></p>
            </div>
        </>
    )
}

export default TopBar
