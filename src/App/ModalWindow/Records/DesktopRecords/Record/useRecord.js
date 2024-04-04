import React from "react"

export default (props) => {
    const {
        fields,
        data,
        selected={},
        style={},
        select,
        unselect
    } = props

    // проставить чекбокс, если запись существует в вабранных
    const isChecked = !!selected[data?.id]

    // отрисовать чекбокс, если запись существует
    const isCheckBox = !!data

    return [{
        data,
        style,
        fields,
        isChecked,
        isCheckBox,
    }, {
        select,
        unselect
    }]
}
