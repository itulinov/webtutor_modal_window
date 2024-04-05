import React, {useState} from "react"

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
        style,
        info,
        loading,
        fields,
        value,
        records,
        selected,
    }, {
        getRecords,
        close,
        callback,
        select,
        unselect,
    }] = useModalWindow(params)


    if (!show) {
        return null
    }

    return (
        <div>
            <div className={Classes.background}></div>
            <div className={Classes.modal_window} style={style}>
                <Close close={close} />
                <div className={Classes.padding}>
                    <Header type={params.param.catalog} />
                    <Search getRecords={getRecords}
                        loading={loading}
                        info={info}
                    />
                    <Records fields={fields}
                        records={records}
                        selected={selected}
                        select={select}
                        unselect={unselect}
                    />
                    <Records fields={fields}
                        records={selected}
                        selected={selected}
                        select={unselect}
                        unselect={unselect}
                        rows={3}
                    />
                    <Action close={close} apply={callback} />
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
