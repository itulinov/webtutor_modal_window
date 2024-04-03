/**
 * Проверка, правильно ли заданы поля
 * @param {object} fields
 * @param {boolean}
 */
const isFields = (fields) => {
    if (!fields) {
        return false
    }

    if (typeof fields !== "object") {
        return false
    }

    // у объекта есть поля
    if (!Object.keys(fields).length) {
        return false
    }

    for (let field of Object.keys(fields)) {
        // у каждого поля значение это массив из двух\трех элементов
        if (!Array.isArray(fields[field]) || fields[field].length < 2) {
            return false
        }
    }

    return true
}


/**
 * Проверка, правильно ли задано поле поиска
 * @param {object} find
 * @param {boolean}
 */
const isFind = (find) => {
    if (!find) {
        return false
    }

    if (!Array.isArray(find)) {
        return false
    }

    if (find.length === 0) {
        return false
    }

    for (let elem of find) {
        // каждое поле поиска должно быть стрингой
        if (typeof elem !== "string") {
            return false
        }
    }

    return true
}



/**
 * Проверка обязательных полей
 * @param {object} param - параметры с полями
 * @return {object}
 */
const checkParam = (param) => {
    const {catalog, fields, find} = param

    if (!catalog) {
        return {
            success: false,
            error: "Не задан каталог (catalog)"
        }
    }

    if ( !isFields(fields) ) {
        return {
            success: false,
            error: "Не задано или некорректно задано поле fields"
        }
    }

    if ( !isFind(find)) {
        return {
            success: false,
            error: "Не задано или некорректно задано поле find"
        }
    }

    return {
        success: true,
        error: ""
    }
}

export default checkParam
