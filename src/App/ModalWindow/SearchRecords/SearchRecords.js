import React from "react"
import Record from "@App/ModalWindow/Record"
import Classes from "./SearchRecords.module.css"

function SearchRecords({fields, records, select}) {
    const style = {
        cursor: 'default',
        background: 'none'
    }

    return (
        <div className={Classes.search_records}>
            <div className={Classes.header}>
                <Record fields={fields} style={style}/>
            </div>
            <div className={Classes.records}>
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
