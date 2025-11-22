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
    const types  = ["Tracked", "Rejected", "Paused", "Complete"]
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    const [curInd, setInd] = useState(0);
    const [title, setTitle] = useState('Active Forms')

    // check if the user is signed it, if not then send to /sign-in
    useEffect(() => {
        if (!signedIn) {
            nav("/sign-in")
        }

    },[])

    const updateType = (e) => {
        // change type of forms to be displayed
        setInd(e.target.title.split('sel-')[1])
        
        // get the four options
        const head = document.querySelector('#headers');
        // go through each and remove color
        head.childNodes.forEach(child => {
            child.removeAttribute('id');
        });
        // add color to one clicked
        e.target.setAttribute('id', 'active-sel')

        

    } 


    /* RENDER ------------------------------ */
    return (
    <>
        <TopBar/>
        <Menu/>
            <div id="home-div">
                <div id="tracker">
                        <h2>Form Tracker</h2>
                    <div id='headers'>
                            <div id='active-sel' title='sel-0' className="select-ftype" onClick={updateType}>Active Forms</div>
                            <div title='sel-1' className="select-ftype" onClick={updateType}>Rejected Forms</div>
                            <div title='sel-2' className="select-ftype" onClick={updateType}>Paused Forms</div>
                            <div title='sel-3' className="select-ftype" onClick={updateType}>Complete Forms</div>
                    </div>
                    <FormTracker ftype={types[curInd]}/>{/*
                    <FormTracker ftype={"Rejected"}/>
                    <FormTracker ftype={"Paused"}/>
                    <FormTracker ftype={"Complete"}/>*/}

                </div>
            </div>
    </>
  )
}

export default Home 
