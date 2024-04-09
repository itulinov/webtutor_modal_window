import React from "react"
import Icon from "@App/ModalWindow/shared/Icon"
import useDesktopRecord from "./useDesktopRecord"

import Classes from "./DesktopRecord.module.css"


function DesktopRecord(props) {
    const [rec, doRec] = useDesktopRecord(props)


    return (
        <div className={Classes.record}
            style={rec.style}
            onClick={() => doRec.select(rec.data)}
        >
            <div className={Classes.check_box}>
                <Icon icon={rec.icon}
                    show={rec.isIcon}
                    click={() => doRec.unselect(rec.data)}
                />
            </div>
            {Object.keys(rec.fields).map((fieldName, index) => {
                const [columnName, width] = rec.fields[fieldName]
                const field = rec.data ? rec.data[fieldName] : columnName

                return (
                    <div key={index}
                        style={{flex: "1 1 " + width}}
                        className={rec.data ? Classes.field : Classes.header}
                    >
                        {field}
                    </div>
                )
            })}
        </div>
    )
}

export default DesktopRecord
