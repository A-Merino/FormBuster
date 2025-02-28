import { useState } from 'react'
import './LandingPage.css'
import SignBar from './SignBar/SignBar.jsx'

function LandingPage() {

    return (
    <>
        <SignBar/>
        <div id='lp-header'>
            <h1>FORM BUSTER: Web Registration and Tracking</h1>
        </div>
        <div id="main-blurb">
            <p>Welcome to Form Buster, the web application solution to pdf forms at Florida Tech. The goal of our project is to remove any and all .pdf files from registrar forms. Forms such as Class Registration, FERPA, Program Plans for graduates and masters students will be avaiable to be completed.</p>
            <p>To fill a form out:</p>
            <ol>
                <li>Register/Sign in</li>
                <li>Pick the form you would like to fill out</li>
                <li>Track the status of your form</li>
            </ol>
            <p>After you complete your form, it will automatically be sent to the faculty and admins necessary to approve and complete the form.</p>

            <h3>Form Tracking</h3>
            <p>A novel feature of this web application is the option to view and track a form and its status. For each form a user completes, they will be able to view to whom the form was sent and whether or not they have completed their part. Users will also recieve email notifications when their form is updated or it's status is changed.</p>
        </div>
    </>
  )
}

export default LandingPage
