import React from 'react'
import { useSelector } from 'react-redux'

const handleGuessWord = (state: { guessString: string; }) => state.guessString;

const WordView = () => {
    const maskedWord = useSelector(handleGuessWord)

    return <p>{maskedWord}</p>
}

export default WordView

