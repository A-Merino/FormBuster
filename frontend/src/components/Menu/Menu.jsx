// react + fontawesome imports
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faGear, faInbox, faHouse, faFile, faPen } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'

// module imports
import User from "./../User/User.jsx"
import './Menu.css'

function Menu() {
    // state varaible to see if menu is open
    const [open, setOpen] = useState(false);
    
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;


    /* OPEN RENDER ------------------------*/
    if (open) {
        return (
            <>
            <div id="ham-menu">
                <div onClick={() => {setOpen(!open)}} id="menu-back">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </div>
                <div id="menu-options">
                    <ul>
                        <li>
                            <Link to="/home">
                            <p>Home</p>
                            <FontAwesomeIcon icon={faHouse}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/inbox">
                            <p>Inbox</p>
                            <FontAwesomeIcon icon={faInbox}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/form-list">
                            <p>Start a New Form</p>
                            <FontAwesomeIcon icon={faFile}/>
                            </Link>
                        </li>
                       
                        <li>
                            <Link to="/account/settings">
                            <p>Settings</p>
                            <FontAwesomeIcon icon={faGear}/>
                            </Link>
                        </li>
                        {account.role === 'admin' &&

                        <li>
                            <Link to="/form-builder">
                            <p>Form Builder</p>
                            <FontAwesomeIcon icon={faPen}/>
                            </Link>
                        </li>
                        }
                    </ul>

                </div>
            </div>
            </>
        )

    } else { 
    /* CLOSED RENDER ------------------------*/
        return (
            <>
            <div onClick={() => {setOpen(!open)}} id="menu-button">
                <FontAwesomeIcon icon={faBars}/>
                
            </div>
            </>
        )
    }

}

export default Menu 
