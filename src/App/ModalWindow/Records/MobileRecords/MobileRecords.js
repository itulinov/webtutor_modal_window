import React from "react"
import MobileRecord from "./MobileRecord"
import Classes from "./MobileRecords.module.css"

function MobileRecords(props) {
    const {fields, records, selected, select, unselect, rows=7} = props
    const styleRows = {height: (rows * 2.43).toString() + 'rem'}

    let data = records
    if (data && typeof(data) === "object" && !Array.isArray(data)) {
        data = Object.values(data)
    }

    return (
        <div className={Classes.mobile_records}>
            <div style={styleRows} className={Classes.records} >
                {data && data.map((record, i) => {
                    return (
                        <MobileRecord key={record.id}
                            fields={fields}
                            data={record}
                            selected={selected}
                            select={select}
                            unselect={unselect}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MobileRecords
