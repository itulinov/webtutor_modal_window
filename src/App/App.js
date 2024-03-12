function App({settings}) {
    console.log("settings: ", settings)

    import ("./modal_window_lib.js").catch((err) => {
        return import("webtutor_modal_window_lib")
    }).then(({default: run}) => {

    })
}

export default App
