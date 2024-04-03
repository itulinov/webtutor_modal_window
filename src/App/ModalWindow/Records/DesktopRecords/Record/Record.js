import React from "react"
//import getRecords from "./getRecords"
import Classes from "./Record.module.css"


function Record({fields, data, style={}, select}) {
    console.log(fields)

    return (
        <div className={Classes.record} style={style} onClick={() => select(data)}>
            {Object.keys(fields).map((fieldName, i) => {
                const [columnName, width] = fields[fieldName]
                const field = data ? data[fieldName] : columnName

                return (
                    <div key={i}
                        style={{flex: "1 1 " + width}}
                        className={data ? null : Classes.header}
                    >
                        {field}
                    </div>
                )
            })}
        </div>
    )
}

export default Record
