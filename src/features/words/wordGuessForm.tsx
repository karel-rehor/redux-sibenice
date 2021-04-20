import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { guessWord } from '../../actions/actions'

const handleGuesses = (state: {guesses: string[]} ) => state.guesses
const handleWordGuessMax = (state: { maxGuesses: number }) => state.maxGuesses

const WordGuessForm = () => {

    const guesses = useSelector(handleGuesses)
    const maxGuesses = useSelector(handleWordGuessMax)


    const dispatch = useDispatch()

    const [guess, setGuess] = useState('guess')

    const onGuessChange = (ev: any) =>{
        setGuess(ev.target.value.toUpperCase())
    }

    const handleSubmit = (ev: any) => {
        ev.preventDefault()
        if(guesses.includes(guess)){
            alert(`You've already tried ${guess}`)
        }else if(guesses.length === maxGuesses){
            alert(`You've used all your guesses`)
        }else if(guess.length < 1){
            alert('Please submit a word')
        }else {
            //dispatch({type: 'guessWord', payload: guess})
            dispatch(guessWord(guess))
        }

        setGuess('')
    }

    return <form>
        <label>Your Guess</label>
        <input type={'text'} id={'guesser'} onChange={onGuessChange} />
        <button onClick={handleSubmit}>Submit</button>
    </form>

}

export default WordGuessForm
