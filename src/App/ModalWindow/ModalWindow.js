import React from "react"

import Header from "./Header"
import Close from "./Close"
import Search from "./Search"
import SearchRecords from "./SearchRecords"
import SelectedRecords from "./SelectedRecords"
import Action from "./Action"

import useModalWindow from "./useModalWindow"
import Classes from "./ModalWindow.module.css"


function ModalWindow({params}) {
    const [{
        show,
        records,
        loading,
        selected,
        fields,
        callback,
    }, getRecords, close] = useModalWindow(params)
    if (!show) {
        return null
    }

    return (
        <div>
            <div className={Classes.background}></div>
            <div className={Classes.modal_window}>
                <Close close={close} />
                <div className={Classes.padding}>
                    <Header />
                    <Search getRecords={getRecords} loading={loading}/>
                    <SearchRecords fields={fields} records={records}/>
                    <SelectedRecords fields={fields} records={selected}/>
                    <Action close={close} apply={() => callback(selected)} />
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
