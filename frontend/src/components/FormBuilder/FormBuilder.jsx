import {useEffect, useRef, useState} from 'react'
import './FormBuilder.css'
import TopBar from "../TopBar/TopBar.jsx";
import Menu from "../Menu/Menu.jsx";
import Editor from "./Editor/Editor.jsx";
import {convertToEditor, convertToDB} from "./Util/Util.jsx";

function FormBuilder() {
    const [newForm, setNewFrom] = useState({
        name: "",
    });
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState({
        id:"",
        name: "",
        data: "",
    });

    const handleChange = (e) => {
        setNewFrom({ ...newForm, [e.target.name]: e.target.value });
    }

    const handleNewForm = () => {
        setForms([...forms, newForm]);
    }

    const editorRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = editorRef.current.getValue();

            form.data = convertToDB(content);
            const response = await fetch(`http://localhost:3000/api/saveForm`, {
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
        // Reset the form data when the selection changes
        setForm({ name: selectedFormName, data: '' });

        // Find the form based on the name selected
        const selectedForm = forms.find((f) => f.name === selectedFormName);
        if (selectedForm) {
            const convertedData = convertToEditor(selectedForm.data);
            // Update the form with the data of the selected form
            setForm({ name: selectedForm.name, data: convertedData });
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
        fetchForms().catch();
    }, []);

    return (
        <>
        <TopBar/>
        <Menu/>
        <div id="form-builder">
            <div id="form-selector">
                <h2>Select a form</h2>
                <select onChange={handleSelect} value={form.name}>
                    <option value="">--Select a Form--</option>
                    {forms.map((form) => (
                        <option key={form.name} value={form.name}>
                            {form.name}
                        </option>
                    ))}
                </select>
                <label>Create new form:
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={newForm.name}
                    />
                </label>
                <button onClick={handleNewForm} type="submit">Submit</button>
            </div>
            {form.name !== "" && (
                <div id="form-editor">
                    <Editor
                        initialValue={form.data}
                        ref={editorRef}
                        id="form-editor"
                        key={form.name}
                    />
                    <button onClick={handleSubmit}>
                        Save Form
                    </button>
                </div>
            )}
        </div>
        </>
    );
}

export default FormBuilder
