import React, {useRef} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import Icon from "@App/ModalWindow/shared/Icon"
import HideFields from "./HideFields"
import useMobileRecord from "./useMobileRecord"

import Classes from "./MobileRecord.module.css"


function MobileRecord(props) {
    const [rec, doRec] = useMobileRecord(props)

    return (
        <div className={Classes.record_wrap}>
            <div className={Classes.record}>
                <div onClick={() => doRec.select(rec.data)} style={rec.style}>
                    <Icon icon={rec.icon}
                        show={rec.isIcon}
                        click={() => doRec.unselect(rec.data)}
                    />
                </div>
                <div onClick={() => doRec.select(rec.data)} style={rec.style}>
                    {rec.data[rec.field]}
                </div>
                <div>
                    <FontAwesomeIcon icon={faIcons["faChevronDown"]} />
                </div>
            </div>
            <HideFields record={rec} />
        </div>
    )
}

export default MobileRecord
