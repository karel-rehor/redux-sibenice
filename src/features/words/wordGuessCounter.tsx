import React from 'react'
import { useSelector } from 'react-redux'

const handleGuesses = (state: { guesses: string[]}) => state.guesses
const handleWordGuessMax = (state: { maxGuesses: number }) => state.maxGuesses

const WordGuessCounter = () => {
    const guesses = useSelector(handleGuesses)
    const maxGuesses = useSelector(handleWordGuessMax)

    return <div>
        <p>{maxGuesses - guesses.length}</p>
        { guesses.length < 1 ? <p></p> :
            <p>So far you've guessed: {guesses.map( (guess, index) => <span key={index}><strong>{guess}</strong>, </span>)}</p>}
    </div>
}

export default WordGuessCounter
