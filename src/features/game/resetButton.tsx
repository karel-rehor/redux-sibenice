import React from 'react'
import { useDispatch } from 'react-redux'

const ResetButton = () => {
    const dispatch = useDispatch()

    const handleReset = (ev: any) => {
        dispatch({type: 'reset'})
    }

    return <button onClick={handleReset}>Reset</button>
}

export default ResetButton
