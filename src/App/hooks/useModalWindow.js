import {useEffect} from "react"
import usePortal from "./usePortal"


export default () => {
    const [portalParams] = usePortal()


    import ("@services/modal_window_lib.js").catch((err) => {
        return import("webtutor_modal_window_lib")
    }).then(({default: getData}) => {
        //getData(param).then(data => console.log("data", data))
    })


    return [portalParams]
}
