import React from "react"
import Record from "./Record"
import Classes from "./DesktopRecords.module.css"

export default (props) => {
    const {fields, records, selected, select, unselect, rows=7} = props
    const styleForHeader = {cursor: 'default', background: 'none'}
    const styleRows = {height: (rows * 2.43).toString() + 'rem'}

    let data = records
    if (data && typeof(data) === "object" && !Array.isArray(data)) {
        data = Object.values(data)
    }

    return (
        <div className={Classes.search_records}>
            <div className={Classes.header}>
                <Record fields={fields} style={styleForHeader}/>
            </div>
            <div className={Classes.records} style={styleRows}>
                {data && data.map((record, i) => {
                    return (
                        <Record key={record.id}
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
