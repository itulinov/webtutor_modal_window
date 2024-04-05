import React from "react"
import {
    collaborator,
    flaw,
    collection,
} from "./example_lib"

function Examples({isDev}) {
    if (!isDev) {
        return null
    }

    return (
        <div>
            <div>
                <button onClick={collaborator}>
                    {collaborator.name}
                </button>
            </div>
            <div>
                <button onClick={flaw}>
                    {flaw.name}
                </button>
            </div>
            <div>
                <button onClick={collection}>
                    {collection.name}
                </button>
            </div>
        </div>
    )
}

export default Examples
