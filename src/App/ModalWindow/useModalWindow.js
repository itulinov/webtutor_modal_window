import React, {useState} from "react"

export default (params) => {
    const {
        param,
        getData,
    } = params

    const [records, setRecords] = useState(null)
    const [loading, setLoading] = useState(false)

    const getRecords = () => {
        setLoading(true)
        getData({
            catalog: "collaborators",
            fields: "id,fullname,code",
            find: "id,fullname,code",
            value: "Тулинов",
            ids: "",
            'user-where': "1=1",
            ssql: "",
            connection: "",
        }, (data) => {
            setLoading(false)
            setRecords(data)
        })
    }

    return [{
        loading,
        records,
        selected: records ? [...records] : [],
    }, getRecords]
}
