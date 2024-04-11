/**
 * Разрешить\запретить выполнение функции добавления записи
 * @param {boolean} checked - true-запись выбрана, false-не выбрана
 * @param {function} select
 * @param {function} unselect
 * @retutn {function}
 */
const add = (checked, select, unselect) => {
    if (!select) {
        return () => {}
    }

    // если запись выбрана
    if (checked) {
        return () => {}
    }

    // если select и unselect являются одной функцией
    // значить мы находимся в разделе выбранных записях
    if (select && unselect && select.name === unselect.name) {
        return () => {}
    }

    // разрешить
    return select
}


/**
 * Разрешить\запретить выполнение функции удаления записи
 * @param {boolean} checked - true-запись выбрана, false-не выбрана
 * @param {function} select
 * @param {function} unselect
 * @retutn {function}
 */
const remove = (checked, unselect) => {
    if (!checked) {
        return () => {}
    }

    if (!unselect) {
        return () => {}
    }

    return unselect
}


/**
 * Получить название иконки
 * @param {boolean} checked - true-запись выбрана, false-не выбрана
 * @param {function} select
 * @param {function} unselect
 * @retutn {function}
 */
const getIcon = (checked, select, unselect) => {
    // если select и unselect являются одной функцией
    // значить мы находимся в разделе выбранных записях
    if (select && unselect && select.name === unselect.name) {
        return "faTrashCan"
    }

    // если запись выбрана
    if (checked) {
        return "faSquareCheck"
    }

    return "faSquare"
}


/**
 * Получить стили
 * @param {boolean} checked - true-запись выбрана, false-не выбрана
 * @param {object} style - дополнительные стили
 * @return {object}
 */
const getStyle = (checked, style={}) => {
    if (checked) {
        return {...style, cursor: "default"}
    }

    return {...style}
}



export {
    add,
    remove,
    getIcon,
    getStyle,
}
