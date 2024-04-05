import React from "react"
import useApp from "@hooks/useApp"
import ModalWindow from "./ModalWindow"
import Examples from "./Examples"

function App({settings}) {
    const [modal] = useApp()
    if (!modal) {
        return <div>modal window is not ready</div>
    }

    return (
        <div>
            <Examples isDev={modal.isDev} />
            <ModalWindow params={modal} />
        </div>
    )
}

export default App
