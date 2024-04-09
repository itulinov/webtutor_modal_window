import {useEffect, useState} from "react"
import checkParam from "@App/ModalWindow/lib/checkParam"


export default () => {
    const [param, setParam] = useState(null)
    const [records, setRecords] = useState([])
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

            self.show = (rec) => {
                if (!check.success) {
                    return
                }

                setRecords(rec)
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
        records,
        show,
        close: () => setShow(false),
    }]
}
