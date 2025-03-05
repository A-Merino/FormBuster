import { useState } from 'react'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


function Menu() {

    const [open, setOpen] = useState(true);

    const showMenu = (event) => {
        
        setOpen(!open);

    }

    if (open) {
        return (
            <>
            <div id="ham-menu">
                <div onClick={showMenu} id="menu-back">
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    
                </div>
            </div>
            </>
        )

    } else {
        return (
            <>
            <div onClick={showMenu} id="menu-button">
                <FontAwesomeIcon icon={faBars}/>
                
            </div>
            </>
        )
    }

}

export default Menu 
