import React from 'react'
import { useSelector } from 'react-redux'
import LetterCell from './letterCell'

import {letter} from "../../types/letter";


const handleLetters = (state: { letters: letter[]; }) => state.letters;

const LetterGrid = () => {
    const letters = useSelector(handleLetters)

    const renderLetters = letters.map(letter => {
        return <LetterCell letter={letter} key={letter.char}/>
    })

    return <p>{renderLetters}</p>
}

export default LetterGrid
