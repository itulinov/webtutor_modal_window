import React, {useState, useEffect} from "react"
import getRequestParams from "./lib/getRequestParams"
import { MULTISELECT, START, HELP, VALUE_IS_LITTLE } from "./lib/consts"


export default (params) => {
    const {
        show,
        param,
        records: defRecords,
        getData,
        close,
    } = params

    const {force, multiselect} = param ? param : {}

    const [style, setStyle] = useState({})
    const [info, setInfo] = useState(START)
    const [selected, setSelect] = useState({})
    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const closeModalWindow = () => {
        // очистить прошлый результат
        setRecords(null)
        setSelect({})
        setInfo(START)

        // закрыть модальное окно
        close()
    }

    // анимируем показ модального окна
    useEffect(() => {
        if (!show) {
            setStyle({})
            return
        }

        setTimeout(() => { setStyle({ opacity: "1", top: "50%", }) }, 0)
    }, [show])


    // принудительный первый запрос
    useEffect(() => {
        if (force !== true) {
            return
        }

        getRecords(null)
    }, [force])


    // установить дефолтных записей
    useEffect(() => {
        if (!defRecords) {
            return
        }

        if (!Array.isArray(defRecords)) {
            return
        }

        setSelect(defRecords.reduce((acc, sld) => {
            return {...acc, [sld.id]: {...sld}}
        }, {}))
    }, [defRecords])


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
        if (multiselect === false && Object.values(selected).length > 0) {
            setInfo(<b style={{color: "#cc003d"}}>{MULTISELECT}</b>)
            return
        }

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
    const getRecords = (value="") => {
        if (value !== null && value.length < 3) {
            setInfo(VALUE_IS_LITTLE)
            return
        }

        var paramsRequest = getRequestParams(param, value)
        setLoading(true)

        getData(paramsRequest, (res) => {
            if (!res.success) {
                console.log(res.error)
                setLoading(false)
                return
            }

            console.log(res.data)
            setRecords(res.data)
            setLoading(false)

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

        setInfo(START)
        const result = Object.values(selected)
        param.callback(result)
    }


    return [{
        show,
        style,
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
