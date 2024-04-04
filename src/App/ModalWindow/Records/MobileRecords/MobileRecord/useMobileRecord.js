import React, {useRef} from "react"
import {add, remove, getIcon, getStyle} from "@App/ModalWindow/lib/record"

export default (props) => {
    const {
        fields,
        data,
        selected={},
        select,
        unselect
    } = props

    // отрисовать чекбокс, если запись существует
    const isIcon = !!data

    // проставить чекбокс, если запись существует в выбранных
    const isChecked = !!selected[data?.id]

    const getTitleField = (fields) => {
        const field = Object.keys(fields).find((fld) => {
            if (fields[fld][2]) {
                return true
            }
        })

        if (field) {
            return field
        }

        return Object.keys(fields)[0]
    }

    const titleField = useRef(null)
    if (!titleField.current) {
        titleField.current = getTitleField(fields)
    }

    return [{
        field: titleField.current,
        icon: getIcon(isChecked, select, unselect),
        data,
        style: getStyle(isChecked),
        fields,
        isIcon,
    }, {
        select: add(isChecked, select, unselect),
        unselect: remove(isChecked, unselect),
    }]
}
