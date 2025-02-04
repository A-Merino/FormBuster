import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import LandingPage from "./../LandingPage/LandingPage.jsx"
import Home from "./../LandingPage/Home/Home.jsx"

/*
  The App function holds the routing for the entire web app
*/
function App() {
    const [count, setCount] = useState(0)

    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Home/>}/>

        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App
