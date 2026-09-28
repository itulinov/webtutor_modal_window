import {useState, useEffect} from "react"
import usePortal from "./usePortal"
import { postData } from "@services/request"


export default (settings) => {
    const [portalParams] = usePortal()
    const isDev = () => {
        const url = new URL(window.location)
        if (url.href.toString().toLowerCase().indexOf("modal_window_dev") > -1) {
            return true
        }

        return false
    }

    const getData = (param, fn = () => {}) => {
        const url = settings.url_to_api
        const body = {
            ...param,
            action: "records",
        }

        const onError = (xhr) => {
            fn({ success: false, error: xhr.statusText })
        }

        const request = postData(url, body)
        request.then(fn, onError)
    }


    return [{
        ...portalParams,
        getData,
        isDev: isDev(),
    }]
}
