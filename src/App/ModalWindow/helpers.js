/**
 * Размеры порций записей главного списка
 * @return {object} first - сколько показать сразу, step - сколько добавлять
 */
const getPageSize = () => {
    return { first: 40, step: 20 }
}


/**
 * Получить записи, которые нужно отрисовать
 * @param {array} records - все записи с сервера
 * @param {number} count - сколько записей показать
 * @return {array|null}
 */
const getVisibleRecords = (records, count) => {
    if (!Array.isArray(records)) {
        return records
    }

    return records.slice(0, count)
}


/**
 * Пролистал ли пользователь достаточно, чтобы добавить следующую порцию.
 * Порог — пролистаны все записи, кроме последней порции (step),
 * считается по доле прокрутки, т.к. высота строк может отличаться
 * @param {HTMLElement} target - прокручиваемый контейнер
 * @param {number} count - сколько записей отрисовано
 * @return {boolean}
 */
const isNeedMore = (target, count) => {
    const pageSize = getPageSize()
    const ratio = (count - pageSize.step) / count
    const threshold = target.scrollHeight * ratio
    const scrolled = target.scrollTop + target.clientHeight

    return scrolled >= threshold
}


export {
    getPageSize,
    getVisibleRecords,
    isNeedMore,
}
