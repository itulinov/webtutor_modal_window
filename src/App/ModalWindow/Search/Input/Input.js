import React from "react"
import search from "@assets/search.png"
import Classes from "./Input.module.css"

function Input({getRecords}) {
    return (
        <div className={Classes.input}>
            <input type="text" placeholder="Поиск" />
            <div className={Classes.btn} onClick={getRecords}>
                <img src={search} alt="go" />
            </div>
        </div>
    )
}

export default Input
