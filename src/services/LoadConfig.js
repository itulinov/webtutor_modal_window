import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useFetch from '@hooks/useFetch'
import App from '@App'

import { DEV_URL } from '@services/consts.js'

function LoadConfig({ settings, children }) {
    const [config, setConfig] = useState(null)
    const [{ isLoading, response, error }, doFetch] = useFetch()

    useEffect(() => {
        doFetch(DEV_URL, {
            action: 'exec',
            codes: settings,
        })
    }, [])

    useEffect(() => {
        if (!isLoading && response) {
            setConfig(response)
        }
    }, [response])

    // показать ошибки в web-интерфейсе
    useEffect(() => {
        if (error) {
            console.log('ERROR: ', error)
        }
    }, [error])

    if (config === null) {
        return null
    }

    return <App settings={config}>{children}</App>
}

LoadConfig.propTypes = {
    settings: PropTypes.string,
    children: PropTypes.node,
}

export default LoadConfig
