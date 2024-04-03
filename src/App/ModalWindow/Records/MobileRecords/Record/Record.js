import React, {useRef} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import useRecord from "./useRecord"

import Classes from "./Record.module.css"


function Record({fields, data, select}) {
    const field = useRecord(fields)

    console.log(field)
    return (
        <div className={Classes.record}>
            <div onClick={() => select(data)}>
                {data[field]}
            </div>
            <div>
                <FontAwesomeIcon icon={faIcons["faChevronDown"]} />
            </div>
        </div>
    )
}

export default Record
