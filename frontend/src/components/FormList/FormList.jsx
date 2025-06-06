import {useEffect, useState} from 'react'
import './FormList.css'

import {Link} from 'react-router'

import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"


function FormList(props) {

    const [forms, setForms] = useState([]);

    // go through each form and 
    const formsAndLinks = forms.map((form) =>
        [form.name, '/forms/' + form.name.toLowerCase().replaceAll(" ", "-")]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                // get all the forms from the database
                const response = await fetch(`http://localhost:3000/api/getForms`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                // turn into json
                const data = await response.json();
                // set the useState variable
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
            <div id="form-list">
                <h2>Start a New Form</h2>
                <ul>
                    {formsAndLinks.map(f => {
                        return <li key={f[1]}><Link to={f[1]}>{f[0]}</Link></li>
                    })}
                </ul>
            </div>

        </>
    )
}

export default FormList
