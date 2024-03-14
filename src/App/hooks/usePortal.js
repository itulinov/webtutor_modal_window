import {useEffect, useState} from "react"

export default () => {
    const [param, setParam] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!window.document.beeline) {
            window.document.beeline = {}
        }

        window.document.beeline.ModalWindow = (param = {}) => {
            const self = {param}

            self.show = () => {
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
