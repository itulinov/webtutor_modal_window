import React, {useEffect} from "react"

export default (props) => {
    const {
        fields,
        data,
        selected={},
        style={},
        select,
        unselect
    } = props

    // отрисовать чекбокс, если запись существует
    const isCheckBox = !!data

    // проставить чекбокс, если запись существует в выбранных
    const isChecked = !!selected[data?.id]

    const add = () => {
        if (isChecked) {
            return () => {}
        }

        if (select && unselect && select.name === unselect.name) {
            return () => {}
        }

        return select
    }

    const remove = () => {
        if (!isChecked) {
            return () => {}
        }

        return unselect
    }

    const getIcon = () => {
        if (select && unselect && select.name === unselect.name) {
            return "faTrashCan"
        }

        if (isChecked) {
            return "faSquareCheck"
        }

        return "faSquare"
    }

    const getStyleRecord = () => {
        if (isChecked) {
            return {...style, cursor: "default"}
        }

        return {...style}
    }

    return [{
        icon: getIcon(),
        data,
        style: getStyleRecord(),
        fields,
        isChecked,
        isCheckBox,
    }, {
        select: add(),
        unselect: remove(),
    }]
}
