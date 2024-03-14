import React from "react"

import Header from "./Header"
import Close from "./Close"

import Classes from "./ModalWindow.module.css"


function ModalWindow({params}) {
    if (!params.show) {
        return null
    }

    return (
        <div>
            <div className={Classes.background}></div>
            <div className={Classes.modal_window}>
                <Close close={params.close} />
                <div className={Classes.padding}>
                    <Header />
                    <div>find</div>
                    <div>
                        <div>records</div>
                        <div>records selected</div>
                    </div>
                    <div>action</div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
