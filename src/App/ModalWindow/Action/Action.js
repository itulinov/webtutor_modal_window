import React from "react"
import Classes from "./Action.module.css"

function Action({close, apply}) {
    return (
        <div className={Classes.action}>
            <button onClick={() => apply()}>Ок</button>
            <button onClick={close}>Отмена</button>
        </div>
    )
}

export default Action
