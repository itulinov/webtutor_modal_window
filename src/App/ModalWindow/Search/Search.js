import React from "react"
import Input from "./Input"
import Classes from "./Search.module.css"

function Search({onSearch, text = "тестовое сообщение"}) {
    return (
        <div className={Classes.search}>
            <Input />
            <div>{text}</div>
        </div>
    )
}

export default Search
