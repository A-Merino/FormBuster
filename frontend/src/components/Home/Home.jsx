import { useState } from 'react'
import './Home.css'
import Dashboard from './Dashboard/Dashboard.jsx'
import Digest from './Digest/Digest.jsx'
import FormDeat from './FormDeat/FormDeat.jsx'
function Home() {

    return (
    <>
    <div id="home-div">
        <Dashboard/>
        <Digest/>
        <FormDeat/>
    </div>
    </>
  )
}

export default Home 
