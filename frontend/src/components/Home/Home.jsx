import { useState } from 'react'
import './Home.css'
import Dashboard from './Dashboard/Dashboard.jsx'
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

            <Dashboard/>
            <Digest/>
            <FormDeat/>
        </div>
    </>
  )
}

export default Home 
