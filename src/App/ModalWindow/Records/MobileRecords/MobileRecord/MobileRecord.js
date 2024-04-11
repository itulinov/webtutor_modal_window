import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import Icon from "@App/ModalWindow/shared/Icon"
import HideFields from "./HideFields"
import useMobileRecord from "./useMobileRecord"
import useDropDown from "./useDropDown"

import Classes from "./MobileRecord.module.css"


function MobileRecord(props) {
    const [{height, content}, toggle] = useDropDown()
    const [rec, doRec] = useMobileRecord(props)

    return (
        <div className={Classes.record_wrap}>
            <div className={Classes.record}>
                <div onClick={() => doRec.select(rec.data)}
                    className={Classes.check_box}
                    style={rec.style}
                >
                    <Icon icon={rec.icon}
                        show={rec.isIcon}
                        click={() => doRec.unselect(rec.data)}
                    />
                </div>
                <div onClick={() => doRec.select(rec.data)}
                    className={Classes.content}
                    style={rec.style}
                >
                    {rec.data[rec.field]}
                </div>
                { // TODO: исключить условия из верстки
                  (Object.values(rec.fields).length === 1)
                    ? null
                    : (
                        <div onClick={toggle}
                            className={Classes.drop_down}
                        >
                            <FontAwesomeIcon icon={
                                faIcons[height ?  "faChevronUp" : "faChevronDown"]
                            } />
                        </div>
                    )
                }
            </div>
            {(Object.values(rec.fields).length === 1)
                ? null
                : (
                    <div className={Classes.wrapper}
                        style={{maxHeight: height + 'px'}}
                    >
                        <div ref={content}>
                            <HideFields record={rec} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MobileRecord
