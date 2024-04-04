import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIconsRegilar from '@fortawesome/free-regular-svg-icons'
//import * as faIconsSolid from '@fortawesome/free-solid-svg-icons'
import Classes from "./CheckBox.module.css"

function CheckBox({show, isChecked, unchecked}) {
    if (!show) {
        return null
    }

    let icon =  faIconsRegilar["faSquare"]
    if (isChecked) {
        icon = faIconsRegilar["faSquareCheck"]
    }

    return (
        <div className={Classes.checkbox}>
            <FontAwesomeIcon icon={icon} onClick={unchecked}/>
        </div>
    )
}

export default CheckBox
