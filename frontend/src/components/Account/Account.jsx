// react imports
import { useState } from 'react'
import {Outlet} from 'react-router'

// module imports
import './Account.css'
import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"


function Account() {

    /* RENDER ------------------------------ */
    return (
    <>
        <TopBar/>
        <Menu/>
        <div id='ac-back'>
        </div>
        <div id="main-div">
        <Outlet/>
        
        </div>
    </>
    )
}

export default Account
