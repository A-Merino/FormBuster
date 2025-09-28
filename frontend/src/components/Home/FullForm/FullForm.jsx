// react imports
import { useState, useEffect, useContext } from 'react'
import {useLocation, useNavigate} from "react-router-dom";

import './FullForm.css'
import SigTree from './SigTree/SigTree.jsx'

import Menu from "./../../Menu/Menu.jsx"
import TopBar from "./../../TopBar/TopBar.jsx"
import User from "./../../User/User.jsx"



function FullForm() {
    const nav = useNavigate();

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    const [form, setForm] = useState({});
    const [good, setGood] = useState(false);
    const [g, setG] = useState({});
    const [fn, setFN] = useState("");
    // Form id from url
    const FID = useLocation().pathname.split('/').at(-1);


    useEffect( () => {
        // console.log(account.id)
        // if (!signedIn) {
        //     nav("/sign-in")
        // }
        // if (!account.forms.includes(FID)) {
        //     nav('/home')
        // }


        // calls api and sets response to form var
        const fetchForm = async (formID) => {
            try {
                const resp = await fetch(`http://localhost:3000/api/getActive`, {
                            method :"POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id:formID})
                        })
                const data = await resp.json();
                setForm(data.form);
                setGood(true);
            } catch (err) {
                console.log(err);
            }
        }
        // get form id from url
        fetchForm(FID);


    }, []);

    // Gets the Form name from the database, using the form ID
    const getFormName = async () => {
        try {
            // get data from api call
            const response = await fetch(`http://localhost:3000/api/getFormName`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formid: form.formType})
            });
            const data = await response.json();
            setFN(data.name) // set name to state variable
        } catch (e) {
            console.log(e)
        }
    }

    if(good){
        // get the form name
        getFormName()
        return (
            <>
            <TopBar/>
            <Menu/>
            <div className='full-form'>
            <h1>{fn}</h1>
            <h3>Form ID: {FID}</h3>
            <h3>Date created: {new Date(form.creationDate).toLocaleString()}</h3>
                <div className='canvas-n-hover'>
                    <SigTree data={form.signatures}/>
                </div>
            </div>
            </> 
        )

    } else {
        return (
            <>
            <p>We appreciate your patience</p>
            </>)
    }

}

export default FullForm


