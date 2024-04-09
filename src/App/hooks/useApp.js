import {useState, useEffect} from "react"
import usePortal from "./usePortal"


export default (settings) => {
    const [portalParams] = usePortal()
    const isDev = () => {
        const url = new URL(window.location)
        if (url.host.toString().toLowerCase().indexOf("localhost") > -1) {
            return true
        }

        return false
    }

    const getData = (param, fn = () => {}) => {
        import ("@services/modal_window_lib.js").catch((err) => {
            return import("webtutor_modal_window_lib")
        }).then(({default: run}) => {
            run(param).then((data) => {
                fn(data)
            })
        })
    }


    return [{
        ...portalParams,
        getData,
        isDev: isDev(),
    }]
}
