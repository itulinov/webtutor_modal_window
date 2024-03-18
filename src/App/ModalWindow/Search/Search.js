import React from "react"
import Input from "./Input"
import Spinner from "./Spinner"

import Classes from "./Search.module.css"


function Search({getRecords, loading=false, text=""}) {
    const information = loading ? <Spinner /> : text

    return (
        <div className={Classes.search}>
            <Input getRecords={getRecords}/>
            <div>
                {information}
            </div>
        </div>
    )
}

export default Search
