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
 * Получить параметры для запроса на сервер
 * @param {object} param - параметры с клиентской части
 * @return {object}
 */
const getRequestParams = (param, value) => {
    const catalog = param.catalog.toString().toLowerCase()
    const fields = getFields(param.fields)
    const find = param.find.join(",")

    return {
        catalog,
        fields,
        find,
        value,
        ids: "",
        'user-where': "1=1",
        ssql: "",
        connection: "",
    }
}

export default getRequestParams
