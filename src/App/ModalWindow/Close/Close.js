import React from "react"
import close from "@assets/close.png"
import Classes from "./Close.module.css"

function Close(props) {
    return (
        <div className={Classes.close}>
            <img src={close} alt="X" onClick={props.close} />
        </div>
    )
}

export default Close
