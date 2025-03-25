import {useEffect, useRef, useState} from 'react'
import './Form.css'
import TopBar from "../TopBar/TopBar.jsx";
import Menu from "../Menu/Menu.jsx";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

function Form() {
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
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                setForm(data.form);
            } catch (error) {
                console.error(error);
            }
        }
        fetchForm();
    }, [formName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formElement = formRef.current;
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());

        const parsedData = JSON.stringify(data);
        console.log('Test: ', parsedData);
        //navigate("/home");
    };

    return (
        <>
            <TopBar/>
            <Menu/>
            <form ref={formRef} id="currentForm">
            <div id="form" dangerouslySetInnerHTML={{ __html: form.data }}/>
            </form>
            <button onClick={handleSubmit}>Submit</button>
            <div id="bottom-padding"></div>
        </>
    );
}

export default Form
