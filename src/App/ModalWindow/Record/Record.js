import React from "react"
import getRecords from "./getRecords"
import Classes from "./Record.module.css"


function Record({ fields, data={} }) {
    if (!fields) {
        console.error("Поле fields является обязателеным!")
        return null
    }

    return (
        <div className={Classes.record}>
        {
            Object.keys(fields).map((fieldName, i) => {
                const [columnName, width] = fields[fieldName]
                const field = !data[columnName] ? columnName : data[columnName]

                return (
                    <div key={i} 
                        style={{flex: "1 1 " + width}}
                        className={!data[columnName] ? Classes.header : null}
                    >
                        {columnName}
                    </div>
                )
            })
        }
        </div>
    )
}

export default Record
