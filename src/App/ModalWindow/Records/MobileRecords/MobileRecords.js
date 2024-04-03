import React from "react"
import Record from "./Record"
import Classes from "./MobileRecords.module.css"

function MobileRecords({fields, records, select, rows=7}) {
    const styleRows = {height: (rows * 2.43).toString() + 'rem'}

    return (
        <div className={Classes.mobile_records}>
            <div style={styleRows}>
                {records && records.map((record, i) => {
                    return (
                        <Record key={i}
                            fields={fields}
                            data={record}
                            select={select}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MobileRecords
