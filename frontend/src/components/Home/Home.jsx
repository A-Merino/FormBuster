// react imports
import { useState, useContext, useEffect } from 'react'
import {useNavigate} from 'react-router';

// module imports
import './Home.css'
import FormTracker from './FormTracker/FormTracker.jsx'
import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"
import User from "./../User/User.jsx"


function Home() {
    // create navigate hook
    const nav = useNavigate();

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    // check if the user is signed it, if not then send to /sign-in
    useEffect(() => {
        if (!signedIn) {
            nav("/sign-in")
        }

    },[])


    /* RENDER ------------------------------ */
    return (
    <>
        <TopBar/>
        <Menu/>
            <div id="home-div">
                <FormTracker/>
            </div>
    </>
  )
}

export default Home 
