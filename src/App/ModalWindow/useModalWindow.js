import React, {useState} from "react"

export default (params) => {
    const {
        show,
        param,
        getData,
        close,
    } = params

    const [selected, setSelect] = useState([])
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const closeModalWindow = () => {
        // очистить прошлый результат
        setRecords(null)

        // закрыть модальное окно
        close()
    }


    /**
     * Выбор элементов
     * @param {object} record - одна запись списка элементов
     */
    const selectRecord = (record) => {
        const found = selected.find((selectRec) => {
            return selectRec.id === record.id
        })

        if (found) {
            setSelect([...selected])
            return
        }

        setSelect([record, ...selected])
    }


    /**
     * TODO: отправка запроса с конвертированием данных
     */
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
        selected,
        fields: param ? param.fields : {},
    }, getRecords, closeModalWindow, param && param.callback, selectRecord]
}
