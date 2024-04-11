import React from "react"
import useDropDown from "./useDropDown"

import Classes from "./DropDown.module.css"


// TODO: сейчас оно не работает
// скорее всего понадобится для исключения логики из верстки
function DropDown({record}) {
    const [{height, content}, toggle] = useDropDown()

    console.log(record)
    if (Object.values(record).length === 1) {
        return
    }

    return (
            <div className={Classes.wrapper}
                style={{maxHeight: height + 'px'}}
            >
                <div ref={content}>
                    <HideFields record={rec} />
                </div>
            </div>
    )
}

export default DropDown
