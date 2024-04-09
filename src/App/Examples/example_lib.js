const connection = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'cpk',
        fields: {
            id: ['Код', '9%'],
            Фамилия: ['Фамилия', '24%'],
            Имя: ['Имя', '24%'],
            winlogin: ['Логин', '20%'],
            Блок: ['Блок', '20%'],
        },
        find: ['Код', 'Фамилия', 'Имя', 'winlogin', 'Блок'],
        callback: function (arrId) {
            console.log(arrId)
        },
        ssql:   "SELECT " +
                "     winlogin id " +
                "     ,Код " +
                "     ,Фамилия " +
                "     ,Имя " +
                "     ,winlogin " +
                "     ,Блок " +
                "FROM [rs].[DokEmployeesDatabaseUnion] AS cpk " +
                "WHERE [Период отчетности] BETWEEN '20220101' AND '20220101' " +
                "AND ЦБО in ('128','190') AND Должность not in ('Ученик') " +
                "ORDER BY Код",
        connection: "team_leader_for_cpk"
    })

    mw.show()
}

const setRecord = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '20%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '40%'],
        },
        multiselect: true,
        find: ['fullname', 'code'],
        callback: function (data) {
            console.log(data)
        },
    })

    const record = [{
        id: "1234",
        fullname: "Zhora",
        position_name: "position",
        position_parent_name: "subdivision",
        code: "test",
    }]
    mw.show(record)
}

const multiselect = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '20%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '40%'],
        },
        multiselect: false,
        find: ['fullname', 'code'],
        callback: function (data) {
            console.log(data)
        },
    })

    mw.show()
}

const where = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '20%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '40%'],
        },
        find: ['fullname', 'code'],
        callback: function (data) {
            console.log(data)
        },
        where: "catalog.is_dismiss=0"
    })

    mw.show()
}

const force = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'cs',
        fields: {
            fullname: ['ФИО', '20%']
        },
        find: ['id', 'fullname', 'code'],
        force: true,
        callback: function (data) {
            console.log(data)
        },
        ssql: "SELECT top 5 cs.id, cs.fullname FROM collaborators AS cs"
    })

    mw.show()
}

const sql = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'cs',
        fields: {
            fullname: ['ФИО', '20%'],
            code: ['Табельный №', '15%'],
        },
        find: ['id', 'fullname', 'code'],
        callback: function (data) {
            console.log(data)
        },
        ssql: "SELECT cs.id, cs.fullname, cs.code FROM collaborators AS cs"
    })

    mw.show()
}

const catalog = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '20%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '40%'],
        },
        find: ['fullname', 'code'],
        callback: function (data) {
            console.log(data)
        }
    })

    mw.show()
}

const collection = () => {
    const mw = new window.document.beeline.ModalWindow({
        collection: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '30%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '20%'],
        },
        callback: function (data) {
            console.log(data)
        }
    })

    mw.show()
}

const flaw = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: "collaborators",
        fields: {},
        find: [],
        value: "Тулинов",
        ids: "",
        'user-where': "1=1",
        ssql: "",
        connection: "",
    })

    mw.show()
}

export {
    connection,
    setRecord,
    multiselect,
    where,
    force,
    sql,
    catalog,
    flaw,
    collection,
}
