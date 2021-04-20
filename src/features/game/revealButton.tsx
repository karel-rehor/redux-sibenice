import React from 'react'
import { useDispatch } from 'react-redux'
import { reveal } from '../../actions/actions'

const RevealButton = () => {
    const dispatch = useDispatch()

    const handleReset = (ev: any) => {
        dispatch(reveal())
    }

    return <button onClick={handleReset}>Reveal</button>
}

export default RevealButton
