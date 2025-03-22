import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import LandingPage from "./../LandingPage/LandingPage.jsx"
import Home from "./../Home/Home.jsx"
import Inbox from "./../Inbox/Inbox.jsx"

// Imports for authentification components
import LogIn from "./../Auth/LogIn/LogIn.jsx"
import Register from "./../Auth/Register/Register.jsx"

import Account from "./../Account/Account.jsx"
import Settings from "./../Account/Settings/Settings.jsx"
import Information from "./../Account/Information/Information.jsx"

import FormList from "./../FormList/FormList.jsx"
import FormBuilder from "../FormBuilder/FormBuilder.jsx";

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
            <Route path="/form-builder" element={<FormBuilder/>}/>
            <Route path="/inbox" element={<Inbox/>}/>
            <Route path="/form-list" element={<FormList/>}/>
            <Route path="/account" element={<Account/>}>
                <Route index element={<Information/>}/>
                <Route path="settings" element={<Settings/>}/>

            </Route>
            <Route path="/*" element={<LandingPage/>}/>
        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App
