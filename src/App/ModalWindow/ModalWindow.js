import React from "react"

import Header from "./Header"
import Close from "./Close"
import Search from "./Search"
import SearchRecords from "./SearchRecords"

import useModalWindow from "./useModalWindow"
import Classes from "./ModalWindow.module.css"


function ModalWindow({params}) {
    const {close, show, param} = params
    const [{records, loading}, getRecords] = useModalWindow(params)

    if (!show) {
        return null
    }

    console.log(loading, records)
    return (
        <div>
            <div className={Classes.background}></div>
            <div className={Classes.modal_window}>
                <Close close={close} />
                <div className={Classes.padding}>
                    <Header />
                    <Search getRecords={getRecords}/>
                    <SearchRecords fields={param.fields}/>
                    <div>records selected</div>
                    <div>action</div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
