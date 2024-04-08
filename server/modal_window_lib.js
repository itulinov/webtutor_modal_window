/**
 * Логирование
 * @param {string} value - значение для логирования
 * @param {string} name - название файла лога
 */
function addLog(value, name) {
    var sLogName = name;
    if (sLogName == undefined) {
        sLogName = 'mw_lib';
    }

    EnableLog(sLogName);
    LogEvent(sLogName, value);
}


/**
 * Очистка кэша
 * @return {XmElem}
 */
 function clear() {
    var path = "x-local://wt/web/custom_projects/modal_window/modal_window_lib.js"
    DropFormsCache(path)
    return OpenCodeLib(path)
}


/**
 * Подготавливаем текст для JSON (убираем запрещающие символы)
 *
 * String str
 *
 * return string
 */
function renameToJson(str) {
    var result = '';

    result = StrReplace(str, '"', '\'');
    result = StrReplace(result, '\\', '\\\\');
    result = StrReplace(result, '\r', '');
    result = StrReplace(result, '\n', '');
    result = StrReplace(result, '\t', '');

    if (result == '' || Real(result.indexOf('deleted')) > -1) {
        result = ' - ';
    }

    return result;
}


function getLeftJoin(theCatalog) {
    switch (theCatalog) {
        case 'courses':
            return 'LEFT JOIN course AS c ON c.id=catalog.id';
            break;
        case 'assessments':
            return 'LEFT JOIN assessment AS a ON a.id=catalog.id';
            break;
        /*case 'subdivisions' :
            return 'LEFT JOIN orgs AS os ON os.id=catalog.org_id';
        break;*/
        case 'collaborators':
            return 'LEFT JOIN collaborator AS collab ON collab.id=catalog.id';
            break;
    }

    return '';
}



function getWhereImportantAll(theCatalog) {

    var sCatalog = theCatalog;

    switch (sCatalog) {
        /*case 'collaborators' :
            return 'catalog.is_dismiss=0';
        break;*/
        case 'courses':
            //return 'ISNULL (c.data.value (\'(course/custom_elems/custom_elem[name="is_show_web"]/value)[1]\', \'varchar(max)\'),\'\') = \'true\'';
            break;
        case 'assessments':
            //return 'ISNULL (a.data.value (\'(assessment/custom_elems/custom_elem[name="is_show_web"]/value)[1]\', \'varchar(max)\'),\'\') = \'true\'';
            break;
    }

    return '0=0';
}



function convertFieldToSql(theFields) {
    var sFields = '';
    var arrFields = theFields.split(',');
    for (elem in arrFields) {
        if (Real(String(elem).indexOf('left_join')) > -1) {
            continue;
        }

        sFields += (sFields == '' ? '' : ',') + 'catalog.' + elem;
    }

    return sFields;
}


function getChild(theId, theCatalog, theWhere, theParentLink) {
    var sId = theId;
    var result = [];
    var ssql = 'SELECT * from ' + theCatalog + ' AS catalog WHERE catalog.' + theParentLink + ' = ' + sId + '  AND(' + theWhere + ') ORDER BY name';

    //writeLog('ssql', ssql);

    var sChild = '';
    var elem;
    for (elem in XQuery('sql: ' + ssql)) {
        sChild = getChild(elem.id, theCatalog, theWhere, theParentLink);
        result.push('"' + renameToJson(elem.name) + '" : { "id" : "' + elem.id + '"' + (sChild == '' ? '' : ',' + sChild) + '}');
    }

    if (ArrayCount(result) == 0) {
        return '';
    }

    return result.join(',');
}


/**
 * Получить каталог для поиска по полю
 * @param {object} param
 * @param {string} field
 * @return {strung}
 */
function getCatalog(param, field) {
    if (param == undefined) {
        return 'catalog.';
    }

    if (field == 'id') {
        return String(param.sCatalog) + '.';
    }

    var fields = tools.read_object(param.sFields)
    if (fields.GetOptProperty(field) != undefined && ArrayCount(fields[field]) >= 3) {
        return fields[field][2] + '.';
    }

    return String(param.sCatalog) + '.';
}


/**
 * Получить строку для условия sql-запроса из значения и полей
 * Конвертируем значение и поля поиска в строку для условия sql-запроса
 * @param {string} value
 * @param {array} fields
 * @param {object} param - этот параметр передается только при запросе по полноценному sql-запросу (при запросе по каталогу он = undefined)
 * @return {string}
 */
function getWhereFind(value, fields, param) {
    if (!isField({ 'value': value }, 'value') || value == null) {
        return '0=0';
    }

    var sWhereFind = '';
    var field;
    for (field in fields) {
        sWhereFind += (sWhereFind == '' ? '' : ' OR ') + getCatalog(param, field) + field + ' LIKE ' + value;
    }

    return sWhereFind;
}


/**
 * Проверить строку на возможный злой умысел
 * @param {object} param
 * @return {boolean}
 */
function isWarningSql(ssql) {
    var words = ['DELETE', 'DROP', 'TRUNCATE', 'INSERT', 'UPDATE', 'MERGE'];
    var word;
    for (word in words) {
        if (StrContains(ssql, word, true)) {
            return true;
        }
    }

    return false;
}


/**
 * Разделить sql-строку на части (SELECT, WHERE, GROUP BY, ORDER BY)
 * @param {object} values
 * @return {object}
 */
function crushSsql(values) {
    // TODO: нужно переписать эту функцию на регулярных выражениях

    var ssql = String(values.ssql).toLowerCase();
    var arrSql = [];
    var prevOperator, val, val_for_last_elem;

    var operator;
    for (operator in values.operators) {
        if (operator == 'table') {
            sqlTableWith = '';
            if (StrContains(ssql, 'with')) {
                arrSql = ssql.split('select');
                for (i = 0; i < ArrayCount(arrSql) - 1; i++) {
                    sqlTableWith += arrSql[i] + (i < ArrayCount(arrSql) - 2 ? ' select ' : '');
                }
                ssql = 'select ' + arrSql[ArrayCount(arrSql) - 1];
            }
            values.operators.table.value = sqlTableWith;
            continue;
        }

        curOperatorName = values.operators[operator].GetOptProperty('name');
        arrSql = ssql.split(curOperatorName);

        val = ArrayOptFirstElem(arrSql);
        if (val != undefined && curOperatorName == 'order by') {
            try {
                val_for_last_elem = arrSql[1];
            }
            catch(err) {}
        }

        // если в строке не найден оператор
        if (ArrayCount(arrSql) < 2) {

            // если ненайденный оператор является селектом
            if (operator == 'select') {
                // приостанавливаем обработку т.к. селект является обязательным оператором
                return {};
            }

            continue;
        }

        ssql = arrSql[1];
        if (prevOperator != undefined) {
            values.operators[prevOperator].value = val;
        }
        
        prevOperator = operator;
    }

    if (val_for_last_elem != undefined) {
        values.operators[operator].value = val_for_last_elem; // запись последнего значения
    }

    return {
        table: values.operators.table.GetOptProperty('value'),
        select: values.operators.select.GetOptProperty('value'),
        where: values.operators.where.GetOptProperty('value'),
        group_by: values.operators.group_by.GetOptProperty('value'),
        order_by: values.operators.order_by.GetOptProperty('value'),
    }
}


/**
 * Заменяем предустановленные переменные на значения
 * @param {string} sql
 * @return {string}
 */
function replaceVars(sql) {
    // TODO: что-то как-то сложно ... как появится время предлагаю отрефакторить, если возможно.
    // как минимум стоит подумать, что в этой функции можно упростить
    var arrVar = [];
    var bProcess = true;
    var sSQL = sql;
    while (bProcess) {
        try {
            arrTemp = StrScan(sSQL, '%*s${%s}%s');
            if (arrTemp.length == 2) {
                arrVar.push(arrTemp[0]);
                sSQL = arrTemp[1];
            }
        } catch (err) {
            bProcess = false;
        }
    }

    var replaceVar;
    for (replaceVar in arrVar) {
        eval(replaceVar);
        sql = StrReplace(sql, '${' + replaceVar + '}', eval(replaceVar))
    }

    return sql;
}


/**
 * Подготовить/преобразовать sql
 * @param {string} sql
 * @return {object}
 */
function getPrepareSqlString(sql) {
    var sSql = sql;

    if (StrContains(sSql, '${') && StrContains(sSql, '}')) {
        sSql = replaceVars(sSql); // заменяем встраиваемые переменные
    }

    return {
        sql_string: String(sSql),
        operators: {
            DECLARE: {
                name: 'DECLARE',
                pattern: '[\\s;]{0,}DEClARE[\\s]+(@[\\S]{1,}[\\s]{1,}[\\S]{1,}[;,]?[\\s]{1,})+'
            },
            SET: {
                name: 'SET',
                pattern: '([\\s]*SET[\\s]+@[\\S]+[\\s]*=[\\s]*(?:(\\([\\s]*SELECT[\\s\\S]+?\\)[\\s;]*)|([\\S]+[\\s;]*)))+'
            },
            WITH: {
                name: 'WITH',
                pattern: 'WITH[\\s\\S]+?[\\s]+AS[\\s]+\\([\\s]*SELECT[\\s\\S]+?(?:\\([\\s\\S]+?\\))*?[\\s\\S]+?[\\s]*\\)([\\s]*,[\\s]*\\([\\s]*SELECT[\\s\\S]+?(?:\\([\\s\\S]+?\\))*?[\\s\\S]+?[\\s]*\\))*?[\\s]*(?=SELECT)'
            },
            SELECT_VARS: {
                name: 'SELECT_VARS',
                pattern: '[\\s]*SELECT[\\s]+@[\\S]+[\\s]*=[\\s]*\\([\\s]*SELECT[\\s\\S]+?[\\s]*\\)[\\s;]*(?=SELECT)'
            },
            SELECT: {
                name: 'SELECT',
                pattern: '[\\s]*SELECT[\\s]+[TOP]*[\\s]*[\\d]*[\\s]*(?:([\\s]*(\\([\\s\\S]+?\\)[\\s]*[AS]{0,2}[\\s]*[\\S]+?)[\\s]*)|([\\S]+[\\s]*\\([\\s]*[\\S]+[\\s]*,*[\\s]*[\\S]*[\\s]*,*[\\s]*[\\S]*[\\s]*\\)[\\s]*[AS]{0,2}[\\s]*[\\S]+)|([\\s]*[\\S]+[\\s]*[AS]{0,2}[\\s]*[\\S]*[\\s]*)){1}(?:(,[\\s]*(\\([\\s\\S]+?\\)[\\s]*[AS]{0,2}[\\s]*[\\S]+?)[\\s]*)|([\\S]+[\\s]*\\([\\s]*[\\S]+[\\s]*,[\\s]*[\\S]*[\\s]*,*[\\s]*[\\S]*[\\s]*\\)[\\s]*[AS]{0,2}[\\s]*[\\S]+)|(,[\\s]*[\\S]+[\\s]*[AS]{0,2}[\\s]*[\\S]*[\\s]*))*[\\s]*(?:FROM)(?:([\\s]*\\([\\s\\S]+?\\)[\\s]*[AS]{0,2}[\\s]*[\\S]+)|([\\s]+[\\S]+[\\s]*[AS]{0,2}[\\s]*[\\S]*))[\\s]*(?:[\\S]*[\\s]+JOIN[\\s\\S]+?ON[\\s\\S]+?|CROSS APPLY[\\s\\S]+?|WITH[\\s\\S]+?)*(?=WHERE|GROUP BY|ORDER BY|$)'
            },
            WHERE: {
                name: 'WHERE',
                pattern: '[\\s]*WHERE[\\S\\s]+?(?=GROUP BY|ORDER BY|$)'
            },
            GROUP_BY: {
                name: 'GROUP BY',
                pattern: '[\\s]*GROUP BY[\\S\\s]+?(?=ORDER BY|$)'
            },
            ORDER_BY: {
                name: 'ORDER BY',
                pattern: '[\\s]*ORDER BY[\\S\\s]+'
            }
        }
    };
}


/**
 * Объединить условия sql, фильтра и запроса пользователя в одно
 * @param {object} param
 * @param {string} sqlWhere
 * @return {string}
 */
function getUnitedWhere(param, sqlWhere) {
    var filter = getFilter(param.filter);
    var arrFieldsFind = param.sFind.split(',');
    var sWhereFind = getWhereFind(param.sValue, arrFieldsFind, param);    
    var sWhereSsql = (sqlWhere == undefined ? '0=0' : StrCharRangePos(Trim(sqlWhere), 5, StrCharCount (Trim(sqlWhere))));

    return 'WHERE (' + sWhereSsql + ') AND (' + filter + ') AND (' + sWhereFind + ')';
}


/**
 * Получить объект регулярки
 * @param {string} pattern
 * @param {object} reg_exp
 * @param {object}
 */
function getRegExp(pattern, obj_reg_exp) {
    var objRegExp = obj_reg_exp;
    if (objRegExp == undefined) {
        objRegExp = new ActiveXObject('VBScript.RegExp');
    }
    objRegExp.Global = true;
    objRegExp.IgnoreCase = true;
    objRegExp.MultiLine = true;
    objRegExp.Pattern = pattern;

    return objRegExp;
}


/**
 * Разобрать sql строку
 * @param {string}
 * @return {object}
 */
function parseSql(sql) {
    var preparedObject = getPrepareSqlString(ssql);
    return fillObject(preparedObject);
}


/**
 * Заполнить объект с операторами данными из sql
 * @param {object}
 * @return {object}
 */
function fillObject (objectSql) {
    var sSql = String(objectSql.sql_string);

    var field, objRegExp, objMatches;

    for (field in objectSql.operators) {
        curOperator = objectSql.operators[field];

        objRegExp = getRegExp(curOperator.pattern, objRegExp)
        objMatches = objRegExp.Execute(sSql)
        if (objMatches.Count > 0) {
            curOperator.value = String(objMatches.Item(0))

            // оставим это логирование ... мне легче будет вспомнить как отлаживать регулярки
            //LogEvent('mw_logger', '')
            //LogEvent('mw_logger', curOperator.name + ': ' + String(objMatches.Item(0)))
            //LogEvent('mw_logger', 'ssql: ' + sSql)

            sSql = StrReplaceOne(sSql, String(objMatches.Item(0)), '')
        }
    }

    return objectSql;
}


/**
 * Получить sql-строку согласно параметрам param
 * @param {object} param
 * @return {string}
 */
function getCustomSql(param) {
    var ssql = String(param.ssql);
    if (isWarningSql(ssql)) {
        return '';
    }
    var objSql = parseSql(ssql);

    var result = [];
    var operator, curOperator;
    for (operator in objSql.operators) {
        curOperator = objSql.operators[operator];

        if (curOperator.name == 'WHERE') {
            result.push(getUnitedWhere(param, curOperator.GetOptProperty('value')))
            continue;
        }

        if (curOperator.GetOptProperty('value') == undefined) {
            continue;
        }

        result.push(curOperator.value);
    }

    return result.join(' ');
}


/**
 * Получить значение фильтра, если он существует
 * @param {string} filter
 * @return {string}
 */
function getFilter(filter) {
    if (filter == undefined || filter == '' || filter == 'undefined') {
        return '0=0';
    }

    return filter;
}


/**
 * Проверка на наличие поля и значения в этом поле
 * @param {object} param
 * @param {string} fieldName
 * @param {boolean}
 */
function isField(param, fieldName) {
    if (param[fieldName] != undefined && param[fieldName] != '' && param[fieldName] != 'undefined' && param[fieldName] != null) {
        return true;
    }

    return false;
}


/**
 * Преобразуем объект param в sql строку
 * @param {object} param
 * @return {string}
 */
function getSqlString(param) {
    if (isField(param, 'ssql')) {
        return getCustomSql(param); // запрос по полноценному sql
    }

    if (!StrContains(param.sFields, 'id,', true)) {
        param.sFields = 'id,' + param.sFields; // добавить поле c id принудительно
    }

    var filter = getFilter(param.filter);
    var arrFieldsFind = param.sFind.split(',');
    var sWhereFind = getWhereFind(param.sValue, arrFieldsFind);

    if (isField(param, 'sIds')) {
        return 'SELECT ' + convertFieldToSql(param.sFields) + '\n' +
            'FROM ' + param.sCatalog + ' AS catalog' + '\n' +
            'WHERE (catalog.id=' + StrReplace(param.sIds, ';', ' OR catalog.id=') + ') AND (' + sWhereFind + ') AND (' + filter + ')' + '\n' +
            'ORDER BY catalog.' + arrFieldsFind.join(', catalog.') + '\n';
    }

    return 'SELECT ' + convertFieldToSql(param.sFields) + '\n' +
        'FROM ' + param.sCatalog + ' AS catalog' + '\n' +
        'WHERE (' + sWhereFind + ') AND (' + filter + ')' + '\n' +
        'ORDER BY catalog.' + arrFieldsFind.join(', catalog.') + '\n';
}


/**
 * Получить данные по sql-запросу
 * @raram {string} ssql
 * @param {string} connection_string
 * @param {string} fields - json, объект с поллями для sql-запроса
 * @return {array}
 */
function execSql(ssql, connection_string, fields) {
    if (DataType(connection_string) == 'string' && connection_string != '') {
        //var lib = getSqlLib()
        var lib = OpenCodeLib('x-local:wt/web/custom_projects/libs/sql_lib.js')
        return lib.optXExec(ssql, connection_string)
    }

    return XQuery('sql: ' + ssql)
}


/**
 * Открыть библиотеку позволяющую подключаться к внешней бд
 * @return {XmElem}
 */
function getSqlLib() {
    var path = 'x-local://wt/web/_custom_web/_libs/sql_lib.js';
    if (OpenCodeLib('x-local://wt/web/_custom_web/_libs/lib.js').getAppConfig('serverType') != 'PROD') {
        DropFormsCache(path);
    }

    return OpenCodeLib(path);
}

/**
 * Проверить, разрешено ли выполнение eval
 * @return {boolean}
 */
function isEval(user_id) {
    var ssql = (
        "SELECT id \n " +
        "FROM group_collaborators \n " +
        "WHERE group_id = 7275342832201850338 \n " +
        "      AND collaborator_id = " + user_id + " \n "
    )

    var result = ArrayOptFirstElem(XQuery("sql: " + ssql))
    if (result == undefined) {
        return false
    }

    return true
}


/**
 * Получить строку подключения
 * @param {string} name
 * @return {string}
 */
function getConnection(paramName) {
    if (DataType(paramName) != 'string') {
        return ""
    }

    if (StrCharCount(paramName) <= 0) {
        return ""
    }

    return paramName
}


/**
 * Работаем по sql запросу
 * @param {object} param
 * @return {array}
 */
function runSql(param) {
    // строка sql-запроса
    var ssql = getSqlString(param);

    // поле для подключения к внешней БД
    var fieldName = getConnection(param.connection)

    // выполнит sql-запрос
    return execSql(ssql, fieldName, param.sFields);
}


/**
 * Получить идентификатор коллекции
 * @param {string} collectionCode
 * @return {integer}
 */
function getCollectionId(collectionCode) {
    var ssql = (
        "SELECT id \n " +
        "FROM remote_collections \n " +
        "WHERE code = " + collectionCode + " \n "
    )

    var collection = ArrayOptFirstElem(XQuery("sql: " + ssql))
    if (collection == undefined) {
        throw "collection is undefined"
    }

    return Int(collection.id)
}


/**
 * Работаем по выборке
 * @param {object} param
 * @param {object} Request
 * @return {array}
 */
function runCollection(param, Request) {
    var id = getCollectionId(param.collection)

    var path = "x-local://wt/web/custom_projects/libs/collection_lib.js"
    var collection_lib = OpenCodeLib(path)

    var settings = { id: id, wvars: { value: param.sValue } }
    addLog(tools.object_to_text(settings, 'json'))
    var result = collection_lib.execCollection(settings, Request)
    addLog("resutl: " + tools.object_to_text(result, 'json'))

    if (!result.success) {
        throw result.messageText
    }

    return result.results
}


/**
 * Запустить поиск записей
 * @param {object} param
 * @param {object} Request
 * @return {array}
 */
function run(param, Request) {
    // по выборке
    if (param.collection != "''") {
        return runCollection(param, Request)
    }

    return runSql(param)
}
