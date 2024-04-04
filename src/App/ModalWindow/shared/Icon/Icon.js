import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIcons from '@fortawesome/free-regular-svg-icons'
//import * as faIconsSolid from '@fortawesome/free-solid-svg-icons'
import Classes from "./Icon.module.css"

function Icon({icon, show, isChecked, click}) {
    if (!show) {
        return null
    }

    return (
        <div className={Classes.icon}>
            <FontAwesomeIcon icon={faIcons[icon]} onClick={click}/>
        </div>
    )
}

export default Icon
