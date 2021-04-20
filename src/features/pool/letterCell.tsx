import React from 'react'
import { useDispatch } from 'react-redux'
import { guessLetter } from '../../actions/actions'

// @ts-ignore
const LetterCell = ({letter}) => {

    const dispatch = useDispatch();

    const handleLetterClick = (ev: any) => {
       // alert(ev.target.id + ' ' + ev.target.textContent)
        dispatch(guessLetter(ev.target.textContent))
    }

    return letter.used ?
    <span id={letter.char} key={letter.char} style={{paddingLeft: 10, paddingRight: 10, textDecoration: 'line-through', color: 'grey'}}>{letter.lit}</span> :
    <span onClick={handleLetterClick} key={letter.char} id={letter.char}
          style={{paddingLeft: 10, paddingRight: 10, cursor: 'pointer'}}>{letter.lit}</span>

}

export default LetterCell
