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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formRef.current) {
            return;
        }

        const inputs = formRef.current.querySelectorAll('input');
        const formData = {};

        inputs.forEach(input => {
            formData[input.name] = input.value;
            console.log(input.name + ": " + input.value);
        });

        navigate("/home")
    }

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

    return (
        <>
            <TopBar/>
            <Menu/>
            <div ref={formRef} id="form" dangerouslySetInnerHTML={{ __html: form.data }}/>
            <button onClick={handleSubmit}>Submit</button>
            <div id="bottom-padding"></div>
        </>
    );
}

export default Form
