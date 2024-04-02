import React from "react"
import Classes from "./Action.module.css"

function Action({close, apply}) {
    const ok = () => {
        apply()
        close()
    }


    return (
        <div className={Classes.action}>
            <button onClick={ok}>Ок</button>
            <button onClick={close}>Отмена</button>
        </div>
    )
}

export default Action
