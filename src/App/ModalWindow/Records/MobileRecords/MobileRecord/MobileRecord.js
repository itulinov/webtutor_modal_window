import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import Icon from "@App/ModalWindow/shared/Icon"
import HideFields from "./HideFields"
import useMobileRecord from "./useMobileRecord"
import useDropDown from "./useDropDown"

import Classes from "./MobileRecord.module.css"


function MobileRecord(props) {
    const [rec, doRec] = useMobileRecord(props)
    const [{height, content}, toggle] = useDropDown()

    console.log("height", height)
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
                <div onClick={toggle}>
                    <FontAwesomeIcon icon={
                        faIcons[height ?  "faChevronUp" : "faChevronDown"]
                    } />
                </div>
            </div>
            <div className={Classes.wrapper}
                style={{maxHeight: height + 'px'}}
            >
                <div ref={content}>
                    <HideFields record={rec} />
                </div>
            </div>
        </div>
    )
}

export default MobileRecord
