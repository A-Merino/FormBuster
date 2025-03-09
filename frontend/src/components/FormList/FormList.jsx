import { useState } from 'react'
import './FormList.css'

import {useNavigate, Link} from 'react-router'

import Menu from "./../Menu/Menu.jsx"
import TopBar from "./../TopBar/TopBar.jsx"


function FormList(props) {

    const test = [
        {
            name: "form1",
            link: '/form1'
        },
        {
            name: "form2",
            link: '/form2'
        },
        {
            name: "form3",
            link: '/form3'
        }
    ];


    return (
        <>
            <TopBar/>
            <Menu/>
            <div id="form-list">
                <h2>Start a New Form</h2>
                <ul>
                    {test.map(form => {
                        return <li><Link to={form.link}>{form.name}</Link></li>
                    })}

                </ul>
            </div>

        </>
    )
}

export default FormList
