import React from "react"
import Record from "@App/ModalWindow/Record"
import Classes from "./Records.module.css"

function SearchRecords({fields, records, select, rows=7}) {
    const styleForHeader = {cursor: 'default', background: 'none'}
    const styleRows = {height: (rows * 2.43).toString() + 'rem'}


    return (
        <div className={Classes.search_records}>
            <div className={Classes.header}>
                <Record fields={fields} style={styleForHeader}/>
            </div>
            <div className={Classes.records} style={styleRows}>
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

export default SearchRecords
