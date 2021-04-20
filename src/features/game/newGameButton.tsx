import React from 'react'
import { useDispatch } from 'react-redux'

import list from './vocabulary'

const getWord = () => {
    return list[Math.floor(Math.random() * list.length)]
}

const NewGameButton = () => {
    const dispatch = useDispatch()

    const handleNewGame = (ev: any) => {
        dispatch({type: 'init', payload: {targetString: getWord(), maxGuesses: 3, maxLetters: 10}})
    }

    return <button onClick={handleNewGame}>New Game</button>
}

export default NewGameButton
