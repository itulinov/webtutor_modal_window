import React, {useState} from "react"

export default (params) => {
    const {
        show,
        param,
        getData,
        close,
    } = params

    const information = {
        begin: "Воспользуйтесь поиском.",
        help: "Для добавления/удаления необходимо кликнуть на запись.",
    }

    const [info, setInfo] = useState(information.begin)
    const [selected, setSelect] = useState([])
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const closeModalWindow = () => {
        // очистить прошлый результат
        setRecords(null)
        setSelect([])

        // закрыть модальное окно
        close()
    }


    /**
     * Исключение элементов
     */
    const excludeRecord = (record) => {
        const newSelected = selected.reduce((acc, item) => {
            if (item.id === record.id) {
                return acc
            }

            return [...acc, item]
        }, [])

        setInfo(information.help)
        setSelect(newSelected)
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
     * Получить поля для поиска
     * @param {object} fields
     * @return {string}
     */
    const getFields = (fields) => {
        const arrFields = Object.keys(fields).map(field => {
            return field
        })

        return ['id', ...arrFields].join(",")
    }


    /**
     * TODO: отправка запроса с конвертированием данных
     */
    const getRecords = () => {
        const fields = getFields(param.fields)
        var paramRequest = {
            catalog: param.catalog,
            fields,
            find: param.find.join(","),
        }

        console.log(param)
        console.log(paramRequest)

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

            setInfo(information.help)
        })
    }

    return [{
        show,
        info,
        loading,
        records,
        selected,
        fields: param ? param.fields : {},
    },
        getRecords,
        closeModalWindow,
        param && param.callback,
        selectRecord,
        excludeRecord
    ]
}
