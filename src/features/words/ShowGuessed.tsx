import React from 'react'
import { useSelector } from 'react-redux'

const handleGuessed = (state: { guessed: boolean}) => state.guessed

const ShowGuessed = () => {
    const guessed = useSelector(handleGuessed)

    return guessed ? <p>YOU GUESSED IT</p> : <p>NOT GUESSED YET</p>
}

export default ShowGuessed
