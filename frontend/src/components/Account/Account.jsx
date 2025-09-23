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
        <Outlet/>
        <div id="main-div">
        
        </div>
    </>
    )
}

export default Account
