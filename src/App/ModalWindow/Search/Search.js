import React from "react"
import Input from "./Input"
import Spinner from "./Spinner"

import Classes from "./Search.module.css"


function Search({getRecords, loading=false, info=""}) {
    const information = loading ? <Spinner /> : info

    return (
        <div className={Classes.search}>
            <Input getRecords={getRecords} loading={loading}/>
            <div className={Classes.information}>
                {information}
            </div>
        </div>
    )
}

export default Search
