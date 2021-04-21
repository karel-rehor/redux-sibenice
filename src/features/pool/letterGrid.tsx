import React from 'react'
import { useSelector } from 'react-redux'
import LetterCell from './letterCell'

import {letter} from "../../types/letter";


const handleLetters = (state: { letters: letter[]; }) => state.letters;

const LetterGrid = () => {
    const letters = useSelector(handleLetters)

    const lettersGrid: any = []

    let start = 0;
    let end = 5;
    for(let i = 0; i < 6; i++){
        lettersGrid.push(letters.slice(start, end))
        start = end;
        end = end + 5;
    }

    const RenderLetterRow = ( {letterRow, index} : {letterRow: letter[], index: number } ) => {
        return <div key={index} style={{padding: 10}}>{letterRow.map((letter) => {
            return <LetterCell letter={letter} key={letter.char} />
        })}</div>
    }

    const renderLetterGrid = lettersGrid.map( (letters: any, index: any) => {
        return <RenderLetterRow letterRow={letters} index={index} key={index} />
    })

    return <div>{renderLetterGrid}</div>
}

export default LetterGrid
