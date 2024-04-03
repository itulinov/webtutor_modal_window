import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIconsRegilar from '@fortawesome/free-regular-svg-icons'
//import * as faIconsSolid from '@fortawesome/free-solid-svg-icons'
import Classes from "./CheckBox.module.css"

function CheckBox({show, isChecked}) {
    if (!show) {
        return null
    }

    let icon =  faIconsRegilar["faSquare"]
    if (isChecked) {
        icon = faIconsRegilar["faSquareCheck"]
    }

    return (
        <div>
            <FontAwesomeIcon icon={icon} />
        </div>
    )
}

export default CheckBox
