import { useState } from 'react'

function FerpaForm() {


    return (
    <>
      <form id="form-root-div">
      <div id="form-container">
        <h2>FERPA Form</h2>
        <p>Student consent is required for the release of <b>personally identifiable information</b> such as semester grades, academic record, class schedule, current
            academic standing, student ID and/or Social Security number. <br></br><br></br>
            Students may consent to the release of <b>personally identifiable information</b> to others by completing this form. The Family Educational Rights and
            Privacy Act of 1974 (FERPA) allows disclosure of personally identifiable information without student consent to:
        </p>
        <ul>
          <li>certain government agencies/officials,</li>
          <li>sponsoring agencies,</li>
          <li>outside contractors performing a service for the institution that the institution would otherwise perform for itself,</li>
          <li>National Science Foundation surveys as authorized by Congress,</li>
          <li>subpoenas/court orders, select law enforcement agencies, and</li>
          <li>selected school officials on a need to know basis who have defined legitimate educational interest in such records.</li>
        </ul>
        <p>This request will remain in effect indefinitely, until the student named below notifies the Office of the Registrar otherwise in writing. <br></br><br></br>
            I give permission for the individual(s) named below to request in writing copies of my academic grades and transcript (fee required for official transcript),
            financial status, payment information and other personally identifiable information contained in my university records. University policy requires a
            written request to obtain these documents.
        </p> <br></br>
        <p className="parent-text">Student Information:</p>
        <div className="input-field-titled">
          <p>Last Name</p>
          <input name="last-name" placeholder="Last Name"></input>
        </div>
        <div className="input-field-titled">
          <p>First Name</p>
          <input name="first-name" placeholder="First Name"></input>
        </div>
        <div className="input-field-titled">
          <p>Middle Initial</p>
          <input name="middle-initial" placeholder="Middle Initial" maxLength="1"></input>
        </div>
        <div className="input-field-titled">
          <p>Student ID Number</p>
          <input name="student-id" placeholder="9XXXXXXXX" type="text" pattern="\d*" maxLength="9"></input>
        </div>
        <br></br>
        <div className="input-field-titled">
          <input name="authorization-checkbox" type="checkbox"></input>
          <p><b>Yes, I authorize the release of information to the parties listed below:</b></p>
        </div>
        <div className="input-field-titled">
          <p>Third party name</p>
          <input name="third-party-name-1"></input>
          <p>Relationship</p>
          <input name="third-party-relationship-1"></input>
        </div>
        <div className="input-field-titled">
          <p>Third party name</p>
          <input name="third-party-name-2"></input>
          <p>Relationship</p>
          <input name="third-party-relationship-2"></input>
        </div>
        <div className="input-field-titled">
          <p>Third party name</p>
          <input name="third-party-name-3"></input>
          <p>Relationship</p>
          <input name="third-party-relationship-3"></input>
        </div>
        <div className="input-field-titled">
          <p>Student Signature</p>
          <input name="signature-text"></input>
          <p>Date</p>
          <input name="signature-date" type="date"></input>
        </div>
      </div>
      </form>
    </>
  )
}

export default FerpaForm
