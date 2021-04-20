import React from 'react'
import { useDispatch } from 'react-redux'
import { reset } from '../../actions/actions'

const ResetButton = () => {
    const dispatch = useDispatch()

    const handleReset = (ev: any) => {
        dispatch(reset())
    }

    return <button onClick={handleReset}>Reset</button>
}

export default ResetButton
