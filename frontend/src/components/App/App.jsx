import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import LandingPage from "./../LandingPage/LandingPage.jsx"
import Home from "./../Home/Home.jsx"

// Imports for authentification components
import LogIn from "./../Auth/LogIn/LogIn.jsx"
import Register from "./../Auth/Register/Register.jsx"

/*
  The App function holds the routing for the entire web app
*/
function App() {

    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/sign-in" element={<LogIn/>}/>
            <Route path="/*" element={<LandingPage/>}/>
        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App
