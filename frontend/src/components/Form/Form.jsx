import {useEffect, useRef, useState,useContext} from 'react'
import './Form.css'
import TopBar from "../TopBar/TopBar.jsx";
import Menu from "../Menu/Menu.jsx";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import User from "./../User/User.jsx"


function Form() {
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    const navigate = useNavigate();

    const formRef = useRef(null);
    const { formName } = useParams();
    const [form, setForm] = useState({
        name: "",
        data: "",
    });

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formElement = document.querySelector('#currentForm');
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());
        const parsedData = {
            formData: data,
            formType: form.name,
            origin: account
        }


        const response = await fetch(`http://localhost:3000/api/createActive`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedData)
        });

        //console.log('Test: ', parsedData);
        //navigate("/home");
    };

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
