import React from "react"
import CheckBox from "@App/ModalWindow/shared/CheckBox"
import Classes from "./Record.module.css"


function Record(props) {
    const {
        fields,
        data,
        selected={},
        style={},
        select,
        unselect
    } = props

    // TODO: сделать удаление из поиска по чекбоксу
    //const [] = useRecord(props)

    return (
        <div className={Classes.record} style={style} onClick={() => select(data)}>
            <div className={Classes.check_box}>
                <CheckBox isChecked={!!selected[data?.id]} show={!!data}/>
            </div>
            {Object.keys(fields).map((fieldName, i) => {
                const [columnName, width] = fields[fieldName]
                const field = data ? data[fieldName] : columnName

                return (
                    <div key={i}
                        style={{flex: "1 1 " + width}}
                        className={data ? null : Classes.header}
                    >
                        {field}
                    </div>
                )
            })}
        </div>
    )
}

export default Record
