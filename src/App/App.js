import React from "react"
import useModalWindow from "@hooks/useModalWindow"


function App({settings}) {
    const [modal] = useModalWindow()

    console.log("settings: ", settings)
    console.log("modal: ", modal)


    return (
        <div>modal_window</div>
    )
}

export default App
