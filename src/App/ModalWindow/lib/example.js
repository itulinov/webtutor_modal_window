const collaborator = () => {
    const mw = new window.document.beeline.ModalWindow({
        catalog: 'collaborators',
        fields: {
            code: ['Табельный №', '15%'],
            fullname: ['ФИО', '30%', 'is_title'],
            position_name: ['Должность', '20%'],
            position_parent_name: ['Подразделение', '20%'],
        },
        find: ['id', 'fullname', 'code'],
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
    collaborator,
    flaw
}
