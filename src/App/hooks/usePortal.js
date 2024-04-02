import {useEffect, useState} from "react"
import checkParam from "@App/ModalWindow/lib/checkParam"


export default () => {
    const [param, setParam] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!window.document.beeline) {
            window.document.beeline = {}
        }

        window.document.beeline.ModalWindow = (param = {}) => {
            const check = checkParam(param)
            if (!check.success) {
                console.log(check.error)
            }

            const self = {param}

            self.show = () => {
                if (!check.success) {
                    return
                }

                setShow(true)
                setParam(param)
            }

            self.close = () => {
                setShow(false)
                setParam(null)
            }

            return self
        }

    }, [])


    return [{
        param,
        show,
        close: () => setShow(false),
    }]
}
