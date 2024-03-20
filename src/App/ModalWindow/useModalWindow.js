import React, {useState} from "react"
import getRequestParams from "./lib/getRequestParams"
import { START, HELP } from "./lib/consts"


export default (params) => {
    const {
        show,
        param,
        getData,
        close,
    } = params

    const [info, setInfo] = useState(START)
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

        setInfo(HELP)
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
     * Получение записей с сервера
     * @param {string} value - строка поиска
     */
    const getRecords = (value) => {
        var paramsRequest = getRequestParams(param, value)

        setLoading(true)
        getData(paramsRequest, (data) => {
            setLoading(false)
            setRecords(data)

            setInfo(HELP)
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
