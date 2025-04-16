import { useState } from 'react'

function PermissionUGToTakeGradForm() {

  return (
    <>
      <form id="form-root-div">
        <div id="form-container">
          <h2>Permission Undergrad To Take Graduate Course Form</h2>
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
            <p>Date</p>
            <input name="form-date" type="date"></input>
          </div>
          <div className="input-field-titled">
            <p>Student ID Number</p>
            <input name="student-id" placeholder="9XXXXXXXX" type="text" pattern="\d*" maxLength="9"></input>
          </div>
          <div className="input-field-titled">
            <p>Term</p>
            <input name="term" placeholder="Fall 20XX"></input>
          </div>
          <div className="input-field-titled">
            <p>Cumulative GPA</p>
            <input name="cumulative-gpa" type="text"></input>
          </div>
          <div className="input-field-titled">
            <p>Major</p>
            <input name="major" type="text"></input>
          </div>
          <div className="input-field-titled">
            <p>Graduating Term (Projected)</p>
            <input name="graduating-term" type="text"></input>
          </div>
          <div className="input-field-titled">
            <p>Florida Tech Email</p>
            <input name="email" type="text"></input>
          </div>
          <p className="parent-text">IMPORTANT</p>
          <ul>
            <li>Once a course is approved for use in a degree program and is recorded on the transcript, no reversal is permitted.</li>
            <li>Undergraduates accepted into an accelerated or fast track program may apply up to six 5000-level (graduate) credit hours to both the bachelor’s and
              master’s degrees.</li>
          </ul>
          <p className="parent-text">PROCEDURES</p>
          <ul>
            <li>Complete form.</li>
            <li>If cumulative GPA is 3.0 or higher, obtain signatures from course instructor and your advisor.</li>
            <li>If cumulative GPA is between 2.75 and 3.0, obtain signatures from course instructor, advisor, academic unit head/program chair offering the course and
              your major department head.</li>
            <li>Any request with a cumulative GPA of less than 2.75 will not be approved.</li>
            <li> Signed and approved form goes to the Registration Center for processing.</li>
          </ul>
          <p className="parent-text">COURSE INFORMATION</p>
          <div className="input-field-titled">
            <p>Course Title</p>
            <input name="course-title" type="text"></input>
          </div>
          <div className="input-field-titled">
            <p>CRN</p>
            <input name="course-crn" type="text"></input>
            <p>Prefix</p>
            <input name="course-prefix" type="text"></input>
            <p>Course Number</p>
            <input name="course-number" type="text"></input>
            <p>Section</p>
            <input name="course-section" type="text"></input>
          </div>
        </div>
      </form>
    </>
  )
}

export default PermissionUGToTakeGradForm
