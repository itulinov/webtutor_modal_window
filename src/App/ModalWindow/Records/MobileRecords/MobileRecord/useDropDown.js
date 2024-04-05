import React, {useRef, useState, useEffect} from "react"

export default () => {
    const content = useRef(null)
    const [height, setHeight] = useState(0)

    const toggle = () => {
        if (height) {
            setHeight(0)
            return
        }

        setHeight(content.current.getBoundingClientRect().height)
    }

    return [{height, content}, toggle]
}
