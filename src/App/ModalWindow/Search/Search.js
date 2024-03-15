import React from "react"
import Input from "./Input"
import Classes from "./Search.module.css"

function Search({getRecords, text = "тестовое сообщение"}) {
    return (
        <div className={Classes.search} onClick={getRecords}>
            <Input />
            <div>{text}</div>
        </div>
    )
}

export default Search
