export default ({fields}) => {

    const header = Object.keys(fields).record.map(fieldName => {
        const [columnName, width] = props.fields[fieldName]

        return (
            <div style={{flex: "1 1 " + width}}>{columnName}</div>
        )
    })

    return 
}
