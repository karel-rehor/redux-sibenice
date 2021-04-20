import React from 'react'
import { useSelector } from 'react-redux'

const handleLetterGuessCt = (state: { letterCount: number}) => state.letterCount
const handleLetterGuessMax = (state: { maxLetters: number }) => state.maxLetters

const LetterGuessCounter = () => {
    const guessCount = useSelector(handleLetterGuessCt)
    const maxGuesses = useSelector(handleLetterGuessMax)

    return <p>{maxGuesses - guessCount}</p>
}

export default LetterGuessCounter


