import React from "react"
import {
    connection,
    setRecord,
    multiselect,
    where,
    force,
    sql,
    catalog,
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
                <button onClick={connection}>
                    {connection.name}
                </button>
            </div>
            <div>
                <button onClick={setRecord}>
                    {setRecord.name}
                </button>
            </div>
            <div>
                <button onClick={multiselect}>
                    {multiselect.name}
                </button>
            </div>
            <div>
                <button onClick={where}>
                    {where.name}
                </button>
            </div>
            <div>
                <button onClick={force}>
                    {force.name}
                </button>
            </div>
            <div>
                <button onClick={sql}>
                    {sql.name}
                </button>
            </div>
            <div>
                <button onClick={catalog}>
                    {catalog.name}
                </button>
            </div>
            <div>
                <button onClick={collection}>
                    {collection.name}
                </button>
            </div>
            <div>
                <button onClick={flaw}>
                    {flaw.name}
                </button>
            </div>
        </div>
    )
}

export default Examples
