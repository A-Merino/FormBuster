import { useState } from 'react'
import './Home.css'
import Dashboard from './Dashboard/Dashboard.jsx'
import Digest from './Digest/Digest.jsx'
import FormDeat from './FormDeat/FormDeat.jsx'
import Menu from "./../Menu/Menu.jsx"

function Home() {

    return (
    <>
    <div id="all-home">
        <Menu/>
        <div id="home-div">

            <Dashboard/>
            <Digest/>
            <FormDeat/>
        </div>
    </div>
    </>
  )
}

export default Home 
