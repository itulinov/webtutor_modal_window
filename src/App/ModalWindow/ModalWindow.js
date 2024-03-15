import React from "react"

import Header from "./Header"
import Close from "./Close"
import Search from "./Search"
import SearchRecords from "./SearchRecords"

import Classes from "./ModalWindow.module.css"


function ModalWindow({params}) {
    const {
        close,
        getData,
        param,
        show,
    } = params

    if (!show) {
        return null
    }

    console.log(param)
    return (
        <div>
            <div className={Classes.background}></div>
            <div className={Classes.modal_window}>
                <Close close={close} />
                <div className={Classes.padding}>
                    <Header />
                    <Search />
                    <SearchRecords fields={param.fields}/>
                    <div>records selected</div>
                    <div>action</div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
