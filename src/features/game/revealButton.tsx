import React from 'react'
import { useDispatch } from 'react-redux'

const RevealButton = () => {
    const dispatch = useDispatch()

    const handleReset = (ev: any) => {
        dispatch({type: 'reveal'})
    }

    return <button onClick={handleReset}>Reveal</button>
}

export default RevealButton
