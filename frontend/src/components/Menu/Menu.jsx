import { useState } from 'react'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faGear, faInbox, faHouse, faFile } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router'


function Menu() {

    const [open, setOpen] = useState(false);

    // const showMenu = (event) => {
    //     setOpen(!open);
    // }

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
                        { //<li><Link to="">Home</Link></li>
                        }
                        <li>
                            <Link to="/settings">
                            <p>Settings</p>
                            <FontAwesomeIcon icon={faGear}/>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
            </>
        )

    } else {
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
