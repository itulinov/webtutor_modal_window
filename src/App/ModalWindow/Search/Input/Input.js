import React, {useState} from "react"
import search from "@assets/search.png"
import Classes from "./Input.module.css"

function Input({getRecords}) {
    const [value, setValue] = useState("")

    return (
        <div className={Classes.input}>
            <input type="text"
                placeholder="Поиск"
                onInput={({target}) => setValue(target.value)}
                defaultValue={value}
            />
            <div className={Classes.btn} onClick={() => getRecords(value)}>
                <img src={search} alt="go" />
            </div>
        </div>
    )
}

export default Input
