// react imports
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {useEffect, useRef, useState,useContext} from 'react'

// module imports
import TopBar from "../TopBar/TopBar.jsx";
import Menu from "../Menu/Menu.jsx";
import User from "./../User/User.jsx"
import './Form.css'

function Form() {
    // user context and navigator init
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    const navigate = useNavigate();

    // create form state variables
    const formRef = useRef(null);
    const { formName } = useParams();
    const [form, setForm] = useState({});

    useEffect(() => {
        // collect the form information from api 
        const fetchForm = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getFormByName/${formName}`, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                setForm(data.form);
            } catch (error) {
                console.error(error);
            }
        }
        fetchForm();
    }, [formName]);

    // on submit of form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // create variables from web document
        const formElement = document.querySelector('#currentForm');
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());
        const parsedData = {
            formData: data,
            formType: form.id,
            origin: account
        }

        // post the data to the backend
        const response = await fetch(`http://localhost:3000/api/createActive`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedData)
        });
        // go back to home
        navigate("/home");
    };


    /* RENDER ------------------------------ */
    return (
        <>
            <TopBar/>
            <Menu/>
            <div id="form-submission-container">
                <form ref={formRef} id="currentForm">
                    <div id="form" dangerouslySetInnerHTML={{ __html: form.data }}/>
                </form>
                <button onClick={handleSubmit}>Submit</button>
                <div id="bottom-padding"></div>
            </div>
        </>
    );
}

export default Form
