import {useEffect, useState} from 'react'
import './FormBuilder.css'
import TopBar from "../TopBar/TopBar.jsx";
import Menu from "../Menu/Menu.jsx";
import Editor from "./Editor/Editor.jsx";
function FormBuilder() {
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState({
        name: "",
        data: "",
    });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            form.data = document.getElementById("form").innerHTML;
            const response = await fetch('http://localhost:3000/api/saveForm', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error saving form:', error);
        }
    }

    const handleSelect = (e) => {
        const selectedFormName = e.target.value;
        setForm({ name: selectedFormName, data: '' });  // Reset the form data when the selection changes

        // Find the form based on the name selected
        const selectedForm = forms.find((f) => f.name === selectedFormName);
        if (selectedForm) {
            setForm({ name: selectedForm.name, data: selectedForm.data });  // Update the form with the data of the selected form
        }
    }

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getForms', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                const data = await response.json();
                setForms(data.forms);
            } catch (error) {
                console.error(error);
            }
        }
        fetchForms();
    }, []);

    return (
        <>
        <TopBar/>
        <Menu/>
        <div id="form-builder">
            <div>
                <h2>Select a form</h2>
                <select onChange={handleSelect} value={form.name}>
                    <option value="">--Select a Form--</option>
                    {forms.map((form) => (
                        <option key={form.name} value={form.name}>
                            {form.name}
                        </option>
                    ))}
                </select>
            </div>
            <Editor>

            </Editor>
            <div id="mod-form" dangerouslySetInnerHTML={{ __html: form.data }}/>
            {/*{form.name !== "" && (*/}
            {/*<button onClick={handleSubmit}>*/}
            {/*    Save Form*/}
            {/*</button>*/}
            {/*)}*/}
        </div>
        </>
    );
}

export default FormBuilder
