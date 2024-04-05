import React from "react"
import Classes from "./HideFields.module.css"

function HideFields({record}) {
    console.log(record)
    return (
        <div>
        { Object.keys(record.fields).map((field, i) => {
            if (field === record.field) {
                return null
            }

            return (
                <div>
                    <span>{record.fields[field][0]}: </span>
                    <span>{record.data[field]}</span>
                </div>
            )
        }) }
        </div>
    )
}

export default HideFields
