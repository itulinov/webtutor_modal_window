export default (text, type) => {
    if (text) {
        return text
    }

    // TODO: надо подумать ... можно делать запрос в БД для получения названия
    switch(type) {
        case "collaborators": return "Выбор сотрудника"
    }

    return "Выбор объекта"
}

