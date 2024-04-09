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
 * Конвертирование полей
 * @param {any} value
 * @return {string}
 */
const getField = (value) => {
    if (Array.isArray(value)) {
        return value.join(",")
    }

    return ""
}


/**
 * Получить параметры для запроса на сервер
 * @param {object} param - параметры с клиентской части
 * @return {object}
 */
const getRequestParams = (param, value) => {
    const {catalog="", collection=""} = param
    const fields = getFields(param.fields)
    const find = getField(param.find)
    const force = param.force ? true : false

    return {
        catalog,
        collection,
        fields,
        find,
        value,
        force,
        ids: "",
        'user-where': "1=1",
        ssql: param.ssql,
        connection: "",
    }
}

export default getRequestParams
