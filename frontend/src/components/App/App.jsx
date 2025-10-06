// react imports
import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";

// main page imports
import LandingPage from "./../LandingPage/LandingPage.jsx"
import Home from "./../Home/Home.jsx"

// Imports for authentication components
import LogIn from "./../Auth/LogIn/LogIn.jsx"
import Register from "./../Auth/Register/Register.jsx"

// account page imports
import Account from "./../Account/Account.jsx"
import Settings from "./../Account/Settings/Settings.jsx"
import Information from "./../Account/Information/Information.jsx"

// Requirement imports
import Inbox from "./../Inbox/Inbox.jsx"
import FormList from "./../FormList/FormList.jsx"
import Form from "./../Form/Form.jsx"
import FormBuilder from "../FormBuilder/FormBuilder.jsx";
import FullForm from "./../Home/FullForm/FullForm.jsx";
import SignForm from './../SignForm/SignForm.jsx';

import User from './../User/User.jsx'
import './App.css'  // root css


/*
  The App function holds the routing for the entire web app
*/
function App() {

    // Holds the account information
    const [account, setAccount] = useState({});

    // Boolean to see if the session is sign in or not
    const [signedIn, setSigned] = useState(false);

    // When app is rendered, check if there are cookies
    useEffect(() => {
    fetch("/api/get-session", {
        method: "GET"
    })
    .then(res => res.json())
    .then(d => {
      if (d.noUser) {
        return;
      } else {
        setAccount(d);
        setSigned(true);
      }
    })


  },[]);

    /* RENDER ------------------------------ */
    // render with routes
    return (
    <>
    <BrowserRouter>
    <User.Provider value={{user: [account, setAccount], loggedIn: [signedIn, setSigned]}}>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/sign-in" element={<LogIn/>}/>
            <Route path="/form-builder" element={<FormBuilder/>}/>
            <Route path="/inbox" element={<Inbox/>}/>
            <Route path="/form-list" element={<FormList/>}/>
            <Route path="/forms/:formName" element={<Form/>}/>
            <Route path="/account" element={<Account/>}>
                <Route index element={<Information/>}/>
                <Route path="settings" element={<Settings/>}/>

            </Route>
            <Route path="/*" element={<LandingPage/>} />
            <Route path="/form/*" element={<FullForm/>}/>
            <Route path="/sign/*" element={<SignForm/>}/>
        </Routes>
    </User.Provider>
    </BrowserRouter>
    </>
    )
}

export default App
