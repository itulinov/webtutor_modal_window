import React, {useState} from "react"
import getRequestParams from "./lib/getRequestParams"
import { START, HELP, VALUE_IS_LITTLE } from "./lib/consts"


export default (params) => {
    const {
        show,
        param,
        getData,
        close,
    } = params

    const [info, setInfo] = useState(START)
    const [selected, setSelect] = useState({})
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
        const newSelected = Object.values(selected).reduce((acc, sld) => {
            if (sld.id === record.id) {
                return acc
            }

            return {...acc, [sld.id]: {...sld}}
        }, {})

        setInfo(HELP)
        setSelect(newSelected)
    }


    /**
     * Выбор элементов
     * @param {object} record - одна запись списка элементов
     */
    const selectRecord = (record) => {
        const foundField = Object.values(selected).find((sld) => {
            return sld.id === record.id
        })

        if (foundField) {
            setSelect({...selected})
            return
        }

        setSelect({...selected, [record.id]: {...record}})
    }


    /**
     * Получение записей с сервера
     * @param {string} value - строка поиска
     */
    const getRecords = (value) => {
        if (value.length < 3) {
            setInfo(VALUE_IS_LITTLE)
            return
        }

        var paramsRequest = getRequestParams(param, value)
        setLoading(true)

        getData(paramsRequest, (data) => {
            setLoading(false)
            setRecords(data)

            setInfo(HELP)
        })
    }

    /**
     * Вернуть выбранные значения
     */
    const callback = () => {
        if (!param || typeof param.callback !== "function") {
            return
        }

        const result = Object.values(selected)
        param.callback(result)
    }


    return [{
        show,
        info,
        loading,
        records,
        selected,
        fields: param ? param.fields : {},
    }, {
        getRecords,
        close: closeModalWindow,
        callback,
        select: selectRecord,
        unselect: excludeRecord,
    }]
}
