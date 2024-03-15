import React from "react"
import Record from "@App/ModalWindow/Record"
import Classes from "./SearchRecords.module.css"


function SearchRecords({fields}) {

    return (
        <div className={Classes.search_records}>
            <Record fields={fields} />
        </div>
    )
}

export default SearchRecords
