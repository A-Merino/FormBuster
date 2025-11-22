// imports
import './LandingPage.css'
import SignBar from './SignBar/SignBar.jsx'

function LandingPage() {

    /* RENDER ------------------------*/
    return (
    <>
        <SignBar/>
        <div id='lp-header'>
            <h1>FORM BUSTER: Web Registration and Tracking</h1>
        </div>
        <div id="main-blurb">
            <p>Form Buster is a modern replacement for the outdated, PDF-based form process at Florida Tech. Our platform eliminates the need to download, print, scan, or manually email forms. Instead, students, faculty, and administrators can complete, approve, and track forms entirely online.</p>
            
            <h3>Why Form Buster?</h3>
            <div class="feature-block">
                <p>Traditional PDF forms are lacking:</p>
                <ol>
                    <li>Forms can be lost/misplaced</li>
                    <li>Delays occur due to forms needing to be manually routed</li>
                    <li>Users have no visibility into the approval process</li>
                </ol>
                <p>Form Buster solves this by centralizing the entire process into a single web application.</p>
            </div>
            
            <div class="feature-block">
                <p>To fill a form out:</p>
                <ol>
                    <li>Register/Sign in</li>
                        <ul>Log in using your academic account.</ul>
                    <li>Choose a Form</li>
                        <ul>Browse available registrar and academic forms and select one to begin.</ul>
                    <li>Fill Out the Form Online</li>
                        <ul>No downloads, printing, or uploading required.</ul>
                    <li>Submit & Automatically Route for Approval</li>
                        <ul>The system sends your completed form to the required faculty and administrators automatically.</ul>
                    <li>Track Its Progress in Real Time</li>
                        <ul>Get immediate visibility into who has signed, who hasn't, and what step comes next.</ul>
                </ol>
            </div>

            <h3>Key Features</h3>
            <p>See some of the core features Form Buster offers in the sections below.</p>

            <h3>Real-Time Form Tracking Dashboard</h3>
            <div class="feature-block">
                <p>Every submitted form can be viewed on a central dashboard that:</p>
                <ol>
                    <li>Shows who has handled the form</li>
                    <li>Displays pending approvals</li>
                    <li>Indicates whether a form has been signed off by the appropriate faculty</li>
                    <li>Notifies users via the inbox whenever the status changes</li>
                </ol>
            </div>

            <h3>Signature Graph</h3>
            <div class="feature-block">
                <p>All forms can be further inspected to see details on the approval process such as:</p>
                <ol>
                    <li>Which faculty have signed the form</li>
                    <li>Which faculty need to sign the form</li>
                    <li>The current stage of the signature process</li>
                </ol>
            </div>
            
            <h3>Dynamic Inbox & Notifications</h3>
            <div class="feature-block">
                <p>Users have a personal inbox that:</p>
                <ol>
                    <li>Shows new forms requiring action</li>
                    <li>Allows reading and clearing notifications</li>
                    <li>Notifies users of approvals, rejections, comments, or assignments</li>
                </ol>
                <p>Clicking a notification opens a detailed popup showing:</p>
                <ol>
                    <li>The form details</li>
                    <li>Comments left by other reviewers</li>
                    <li>Status changes</li>
                </ol>
            </div>

            <h3>Online Form Completion</h3>
            <div class="feature-block">
                <p>Forms are filled directly in the browser using dynamic fields that:</p>
                <ol>
                    <li>Validate input</li>
                    <li>Prevent missing required information</li>
                    <li>Autofill based on common information (i.e. name, id, etc.)</li>
                </ol>
            </div>

            <h3>Multi-Role Support</h3>
            <div class="feature-block">
                <p>Each role has tailored functionality:</p>
                <ol>
                    <li>Students and All Users: Submit forms and track progress</li>
                    <li>Faculty: Review, approve, and leave comments</li>
                    <li>Admins: Manage routing, review forms, and finalize submissions</li>
                </ol>
            </div>

            <h3>Secure Records</h3>
            <div class="feature-block">
                <p>All form data is:</p>
                <ol>
                    <li>Stored securely in a central database</li>
                    <li>Organized without needing local files</li>
                    <li>Managed in a consistent, traceable workflow</li>
                </ol>
                <p>Once a form is completed:</p>
                <ol>
                    <li>It remains accessible online</li>
                    <li>Users can return to view past submissions</li>
                    <li>Administrators have full visibility for auditing and record-keeping</li>
                </ol>
            </div>
        </div>
    </>
  )
}

export default LandingPage
