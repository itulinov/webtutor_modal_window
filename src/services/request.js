/**
 * POST-запрос к серверу при помощи jQuery
 * @param {string} url
 * @param {object} data - тело запроса
 * @return - данные ответа
 */
export const postData = (url, data) => {
    const body = JSON.stringify(data)

    return $.ajax({
        url: url,
        data: body,
        cache: false,
        type: 'POST',
        dataType: 'JSON',
    })
}
