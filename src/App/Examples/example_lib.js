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
    force,
    sql,
    catalog,
    flaw,
    collection,
}
