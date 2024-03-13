import {useEffect, useState} from "react"

export default () => {
    const [param, setParam] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!window.document.beeline) {
            window.document.beeline = {}
        }

        window.document.beeline.ModalWindow = (param = {}) => {
            setShow(false)

            const self = { param }
                setParam({
                    catalog: "collaborators",
                    fields: "id,fullname,code",
                    find: "id,fullname,code",
                    value: "Тулинова",
                    ids: "",
                    'user-where': "1=1",
                    ssql: "",
                    connection: "",
                })

            self.show = () => setShow(true)
            self.close = () => setShow(false)

            return self
        }

    }, [])


    return [{
        param,
        show,
    }]
}
