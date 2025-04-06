import { useState } from 'react'
import './Home.css'
import FormTracker from './FormTracker/FormTracker.jsx'
import Digest from './Digest/Digest.jsx'
import FormDeat from './FormDeat/FormDeat.jsx'

import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"

function Home() {

    return (
    <>
    <TopBar/>
    <Menu/>
        <div id="home-div">
            <FormTracker/>
            <Digest/>
            <FormDeat/>
        </div>
    </>
  )
}

export default Home 
