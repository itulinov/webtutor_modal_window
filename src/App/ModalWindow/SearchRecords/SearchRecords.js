import React from "react"
import Record from "@App/ModalWindow/Record"
import Classes from "./SearchRecords.module.css"


function SearchRecords({fields, records}) {

    return (
        <div className={Classes.search_records}>
            <Record fields={fields} />
            {records && records.map((record, i) => {
                return (
                    <Record key={i} fields={fields} data={record}/>
                )
            })}
        </div>
    )
}

export default SearchRecords
