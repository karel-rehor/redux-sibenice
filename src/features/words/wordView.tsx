import React from 'react'
import { useSelector } from 'react-redux'

const handleGuessWord = (state: { guessString: string; }) => state.guessString;

const WordView = () => {
    const maskedWord = useSelector(handleGuessWord)

    console.log(`DEBUG maskedWord ${maskedWord}`)
    //console.log(`DEBUG state.guessString ${guessString}`)

    return <p>{maskedWord}</p>
}

export default WordView

