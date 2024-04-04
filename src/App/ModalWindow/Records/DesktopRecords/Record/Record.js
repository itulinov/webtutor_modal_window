import React from "react"
import CheckBox from "@App/ModalWindow/shared/CheckBox"
import useRecord from "./useRecord"

import Classes from "./Record.module.css"


function Record(props) {
    const [rec, doRec] = useRecord(props)

    console.log(doRec.select?.name)

    return (
        <div className={Classes.record}
            style={rec.style}
            onClick={() => doRec.select(rec.data)}
        >
            <div className={Classes.check_box}>
                <CheckBox isChecked={rec.isChecked}
                    show={rec.isCheckBox}
                    unchecked={() => doRec.unselect(rec.data)}
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
