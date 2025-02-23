import { useState } from 'react'
import './SignBar.css'
import {Link} from 'react-router'

function SignBar() {
    // The SignBar Component is the Navigation bar for
    // specifically the landing page. The bar holds the
    // links to the LogIn and Register components


    return (
        <>
        <nav id="landing-nav">
            <ul id="ln-list">
                <li><Link to="/sign-in">Sign in</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default SignBar
