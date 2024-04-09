import React, {useState} from "react"
import search from "@assets/search.png"
import Classes from "./Input.module.css"

function Input({getRecords, loading}) {
    const [value, setValue] = useState("")
    const onEnter = ({target, key}) => {
        if (loading) {
            return
        }

        if (key !== "Enter") {
            return
        }

        getRecords(target.value)
    }

    let opacity = {}
    if (loading) {
        opacity = {
            opacity: ".1"
        }
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
            <div className={Classes.btn}
                style={opacity}
                onClick={() => getRecords(value)}
            >
                <img src={search} alt="go" />
            </div>
        </div>
    )
}

export default Input
