import React, {useRef} from "react"

function useRecord(fields) {
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
        const title = getTitleField(fields)
        titleField.current = title
    }

    return titleField.current
}

export default useRecord
