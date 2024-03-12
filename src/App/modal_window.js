import lib from "mwLib/mwLibInit"
//import lib from "webtutor_modal_window_lib"

    lib({
        catalog: "collaborators",
        fields: "id,fullname,code",
        find: "id,fullname,code",
        value: "Тулинова",
        ids: "",
        'user-where': "1=1",
        ssql: "",
        connection: "",
    }).then(data => console.log("data", data))
