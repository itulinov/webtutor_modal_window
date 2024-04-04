import React from "react"
import Icon from "@App/ModalWindow/shared/Icon"
import useRecord from "./useRecord"

import Classes from "./Record.module.css"


function Record(props) {
    const [rec, doRec] = useRecord(props)


    return (
        <div className={Classes.record}
            style={rec.style}
            onClick={() => doRec.select(rec.data)}
        >
            <div className={Classes.check_box}>
                <Icon icon={rec.icon}
                    isChecked={rec.isChecked}
                    show={rec.isCheckBox}
                    click={() => doRec.unselect(rec.data)}
                />
                
            </div>
            {Object.keys(rec.fields).map((fieldName, i) => {
                const [columnName, width] = rec.fields[fieldName]
                const field = rec.data ? rec.data[fieldName] : columnName

                return (
                    <div key={i}
                        style={{flex: "1 1 " + width}}
                        className={rec.data ? null : Classes.header}
                    >
                        {field}
                    </div>
                )
            })}
        </div>
    )
}

export default Record
