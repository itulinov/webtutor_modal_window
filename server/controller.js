<%

/**
 * Логирование
 * @param {string} value - значение для логирования
 * @param {string} name - название файла лога
 */
function addLog(value, name) {
    var sLogName = name;
    if (sLogName == undefined) {
        sLogName = 'mw';
    }

    EnableLog(sLogName);
    LogEvent(sLogName, value);
}



// Точка входа
try {
    var PATH = "x-local://wt/web/custom_projects/modal_window/modal_window_lib.js"
    var lib = OpenCodeLib(PATH).clear()

    var body = ParseJson(DecodeCharset(Request.Body, 'utf-8'))
    var action = body.GetOptProperty('action')

    switch (action) {
        case "records": {
            var param = {
                sCatalog: body.GetOptProperty('catalog'),
                sFields: body.GetOptProperty('fields'),
                sFind: body.GetOptProperty('find'),
                sValue: XQueryLiteral('%' + body.GetOptProperty('value') + '%'),
                sIds: body.GetOptProperty('ids'),
                filter: body.GetOptProperty('where'),
                ssql: body.GetOptProperty('ssql'),
                connection: body.GetOptProperty('connection', ''),
                collection: XQueryLiteral(body.GetOptProperty("collection")),
            }
            //addLog("param: " + tools.object_to_text(param, 'json'))

            var result = lib.run(param, Request)

            Response.Write(tools.object_to_text({
                success: true,
                data: result
            }, 'json'))
            break;
        }

        case 'exec': {
            if ( !lib.isEval(curUserID) ) {
                throw "access is denied"
            }

            var codes = body.GetOptProperty('codes')
            Response.Write(tools.object_to_text({
                success: true,
                data: eval(codes),
            }, 'json'))
            break
        }

        default: {
            throw "action is undefined: " + action
        }
    }
}
catch (err) {
    addLog("ERROR: " + String(err))
    Response.Write(tools.object_to_text({
        success: false,
        error: String(err),
    }, 'json'))
}

%>
