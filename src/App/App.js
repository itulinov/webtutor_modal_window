import React from "react"
import useModalWindow from "@hooks/useModalWindow"
import ModalWindow from "./ModalWindow"


function App({settings}) {
    const [modal] = useModalWindow()
    if (!modal) {
        return <div>modal window is not ready</div>
    }

    //console.log("settings: ", settings)
    //console.log("modal: ", modal)

    const show = () => {
        const mw = new window.document.beeline.ModalWindow({
            catalog: "collaborators",
            fields: "id,fullname,code",
            find: "id,fullname,code",
            value: "Тулинова",
            ids: "",
            'user-where': "1=1",
            ssql: "",
            connection: "",
        })
        mw.show()
    }

    const show1 = () => {
        const mw = new window.document.beeline.ModalWindow({
            catalog: "collaborators",
            fields: "id,fullname,code",
            find: "id,fullname,code",
            value: "Тулинов",
            ids: "",
            'user-where': "1=1",
            ssql: "",
            connection: "",
        })
        mw.show()
    }

    if (!modal.show) {
        setTimeout(() => show(), 100)
    }

    return (
        <div>
            <div>
                <button onClick={show}>Открыть</button>
            </div>
            <div>
                <button onClick={show1}>Открыть</button>
            </div>
            <ModalWindow params={modal}/>
        </div>
    )
}

export default App
