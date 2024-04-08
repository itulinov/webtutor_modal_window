import React from "react"
import DesktopRecord from "./DesktopRecord"
import Classes from "./DesktopRecords.module.css"

export default (props) => {
    const {fields, records, selected, select, unselect, rows=7} = props
    const styleForHeader = {cursor: 'default'}
    const styleRows = {height: (rows * 2.43).toString() + 'rem'}

    let data = records
    if (data && typeof(data) === "object" && !Array.isArray(data)) {
        data = Object.values(data)
    }

    return (
        <div className={Classes.search_records}>
            <div className={Classes.header}>
                <DesktopRecord fields={fields} style={styleForHeader}/>
            </div>
            <div className={Classes.records} style={styleRows}>
                {data && data.map((record, i) => {
                    return (
                        <DesktopRecord key={record.id}
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
