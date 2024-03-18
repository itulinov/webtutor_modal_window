import React from "react"
import Record from "@App/ModalWindow/Record"
import Classes from "./SearchRecords.module.css"

function SearchRecords({fields, records}) {
    let style = {}
    if (true) {
        style = {
            cursor: 'default',
            background: 'none'
        }
    }

    return (
        <div className={Classes.search_records}>
            <Record fields={fields} style={style}/>
            {records && records.map((record, i) => {
                return (
                    <Record key={i} fields={fields} data={record}/>
                )
            })}
        </div>
    )
}

export default SearchRecords
