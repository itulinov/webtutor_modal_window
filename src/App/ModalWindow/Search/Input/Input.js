import React from "react"
import search from "@assets/search.png"
import Classes from "./Input.module.css"

function Input() {
    return (
        <div className={Classes.input}>
            <input type="text" placeholder="Поиск" />
            <div className={Classes.btn}>
                <img src={search} alt="go" />
            </div>
        </div>
    )
}

export default Input
