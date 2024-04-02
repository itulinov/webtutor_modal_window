import React from "react"
import useApp from "@hooks/useApp"
import ModalWindow from "./ModalWindow"


function App({settings}) {
    const [modal] = useApp()
    if (!modal) {
        return <div>modal window is not ready</div>
    }

    //console.log("settings: ", settings)
    //console.log("modal: ", modal)

    const show = () => {
        const mw = new window.document.beeline.ModalWindow({
            catalog: 'collaborators',
            fields: {
                code: ['тн', '15%'],
                fullname: ['ФИО', '60%'],
            },
            find: ['id', 'fullname', 'code'],
            callback: function (data) {
                console.log(data)
            }
        })

        mw.show()
    }

    const show1 = () => {
        const mw = new window.document.beeline.ModalWindow({
            catalog: "collaborators",
            fields: {},
            find: [],
            value: "Тулинов",
            ids: "",
            'user-where': "1=1",
            ssql: "",
            connection: "",
        })

        mw.show()
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
