import React, {useState} from "react"
import search from "@assets/search.png"
import Classes from "./Input.module.css"

function Input({getRecords}) {
    const [value, setValue] = useState("")
    const onEnter = ({target, key}) => {
        if (key !== "Enter") {
            return
        }

        getRecords(target.value)
    }

    return (
        <div className={Classes.input}>
            <input type="text"
                autoFocus
                placeholder="Поиск"
                onInput={({target}) => setValue(target.value)}
                defaultValue={value}
                onKeyDown={onEnter}
            />
            <div className={Classes.btn} onClick={() => getRecords(value)}>
                <img src={search} alt="go" />
            </div>
        </div>
    )
}

export default Input
