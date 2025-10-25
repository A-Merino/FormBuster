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
    const [ready, setReady] = useState(false);

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
                setReady(true);
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
        const formElement = document.querySelector('#form-container');
        const formDatar = new FormData(formElement);
        const data = Object.fromEntries(formDatar.entries());
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

    // completing autofill
    const autoFill = () => {
        let inputs = document.querySelectorAll('input');

        inputs = [...inputs]

        inputs.map(input => {
            // const tag  = input.querySelector('input');
            switch (input.name) {
                case 'lname':
                    input.value = account.lastName;
                    break;
                case 'fname':
                    input.value = account.firstName;
                    break;
                case 'sid':
                    input.value = account.id;
                    break;
                case 'advisor':
                    input.value = account.advisor;
                    break;
                case 'major':
                    input.value = account.major;
                    break;
                case 'date':
                    input.value = getDate();
                    break;
                case 'email':
                    input.value = account.email;
                    break;
                default:
                    break;
            };        });
    }

    const getDate = () => {
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    }

    /* RENDER ------------------------------ */
    if (ready) {
    return (
        <>
            <TopBar/>
            <Menu/>
            <div id="form-submission-container">
                <form ref={formRef} id="form-container">
                    <div id="form" dangerouslySetInnerHTML={{ __html: form.data }}/>
                </form>
                <div id="submit">
                    <button id="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
                <div id="bottom-padding"></div>
            </div>
        {autoFill()}
        </>
    );
    }
}

export default Form
