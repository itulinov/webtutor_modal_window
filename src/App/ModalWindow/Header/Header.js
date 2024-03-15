import React from "react"
import getHeader from "./getHeader"
import Classes from "./Header.module.css"

function Header({text, type}) {
    const name = getHeader(text, type)

    return (
        <div className={Classes.header}>{name}</div>
    )
}

export default Header
