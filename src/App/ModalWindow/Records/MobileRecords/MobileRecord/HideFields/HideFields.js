import React from "react"
import Classes from "./HideFields.module.css"

function HideFields({record}) {

    return (
        <div className={Classes.hide_fields}>
        { Object.keys(record.fields).map((field, i) => {
            if (field === record.field) {
                return null
            }

            return (
                <div key={i} className={Classes.hide_field}>
                    <div>{record.fields[field][0]}:</div>
                    <div>{record.data[field]}</div>
                </div>
            )
        }) }
        </div>
    )
}

export default HideFields
