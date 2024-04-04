import React, {useEffect} from "react"
import {add, remove, getIcon, getStyle} from "@App/ModalWindow/lib/record"

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
    const isIcon = !!data

    // проставить чекбокс, если запись существует в выбранных
    const isChecked = !!selected[data?.id]

    return [{
        icon: getIcon(isChecked, select, unselect),
        data,
        style: getStyle(isChecked, style),
        fields,
        isIcon,
    }, {
        select: add(isChecked, select, unselect),
        unselect: remove(isChecked, unselect),
    }]
}
