import React, {useState} from "react"

export default (params) => {
    const {
        show,
        param,
        getData,
        close,
    } = params

    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const closeModalWindow = () => {
        // очистить прошлый результат
        setRecords(null)

        // закрыть модальное окно
        close()
    }


    const getRecords = () => {
        setLoading(true)
        getData({
            catalog: "collaborators",
            fields: "id,fullname,code",
            find: "id,fullname,code",
            value: "Тулинов",
            ids: "",
            'user-where': "1=1",
            ssql: "",
            connection: "",
        }, (data) => {
            setLoading(false)
            setRecords(data)
        })
    }

    return [{
        show,
        loading,
        records,
        selected: records ? [...records] : [],
        fields: param ? param.fields : {},
        callback: param ? param.callback : () => {},
    }, getRecords, closeModalWindow]
}
