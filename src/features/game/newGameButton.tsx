import React from 'react'
import { useDispatch } from 'react-redux'
import { initialize } from '../../actions/actions'
import { getRandomWord } from '../words/word'

const NewGameButton = () => {
    const dispatch = useDispatch()

    const handleNewGame = (ev: any) => {
        dispatch(initialize({targetString: getRandomWord(), maxGuesses: 3, maxLetters: 10}))
    }

    return <button onClick={handleNewGame}>New Game</button>
}

export default NewGameButton
