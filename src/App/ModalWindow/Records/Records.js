import React from "react"
import useResize from "@hooks/useResize"
import DesktopRecords from "./DesktopRecords"
import MobileRecords from "./MobileRecords"

function Records(props) {
    const {fields, records, selected, select, unselect, rows} = props
    const [size] = useResize()

    if (size <= 720) {
        return (
            <MobileRecords fields={fields}
                records={records}
                select={select}
                rows={rows}
            />
        )
    }

    return (
        <DesktopRecords fields={fields}
            records={records}
            selected={selected}
            select={select}
            unselect={unselect}
            rows={rows}
        />
    )
}

export default Records
