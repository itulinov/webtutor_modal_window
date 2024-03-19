import React from "react"

import Header from "./Header"
import Close from "./Close"
import Search from "./Search"
import Records from "./Records"
import Action from "./Action"

import useModalWindow from "./useModalWindow"
import Classes from "./ModalWindow.module.css"


function ModalWindow({params}) {
    const [{
        show,
        loading,
        fields,
        records,
        selected,
    }, getRecords, close, callback, select, exclude] = useModalWindow(params)


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
                    <Records fields={fields}
                        records={records}
                        select={select}
                    />
                    <Records fields={fields}
                        records={selected}
                        select={exclude}
                        rows={3}
                    />
                    <Action close={close} apply={() => callback(selected)} />
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
