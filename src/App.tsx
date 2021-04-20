import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import { useSelector} from 'react-redux'

import store from './store'
//import { //letter,
 // getLetters,
 // getStringFromLetters,
 // getLetter,
 // setAltChars,
  //matchLetter,
 // findIndexes,
 // setCharsInString,
 // initialState} from './AppState'

import { letter } from './types/letter'
import { getStringFromLetters } from './features/words/word'
import { getLetters,
  getLetter,
//  getLettersFromString,
  setAltChars,
//  matchLetter,
//  findIndexes
} from './features/pool/letterPool'

//import { setCharsInString } from './features/words/word'

//import rootReducer from './reducer'

import LetterGrid from './features/pool/letterGrid'
import WordView from './features/words/wordView'
import LetterGuessCounter from './features/words/letterGuessCounter'
import WordGuessForm from './features/words/wordGuessForm'
import WordGuessCounter from './features/words/wordGuessCounter'
import ShowGuessed from './features/words/ShowGuessed'
import ResetButton from './features/game/resetButton'
import NewGameButton from './features/game/newGameButton'
import RevealButton from './features/game/revealButton'

//const abcd = getLetters('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
const abcd = getLetters()

console.log('DEBUG getStringFromLetters ' + getStringFromLetters(abcd))
setAltChars(getLetter(abcd, 'E') as letter, 'ÉĚË')
console.log('DEBUG abcd ' + JSON.stringify(abcd))
console.log('DEBUG getLetter E ' + JSON.stringify(getLetter(abcd, 'E')))

//const test = 'giraffe-attack!'
//const test2 = test.replaceAll(/\w/g, '*');

//const test3 = matchLetter(getLettersFromString(test), 'f')

//const indexes = findIndexes(getLettersFromString(test), 'a'.charCodeAt(0))

//const mask = setCharsInString(test2, indexes, 'a')

//const indexes2 = findIndexes(getLettersFromString(test), 'f'.charCodeAt(0))

//const mask2 = setCharsInString(mask, indexes2, 'f')

//const handleTargetWord = (state: { targetWord: any; }) => state.targetWord;

/*
console.log(`DEBUG test ${test} test2 ${test2} test3 ${JSON.stringify(test3)}`)

console.log(`DEBUG indexes ${JSON.stringify(indexes)}`)

console.log(`DEBUG rootReducer ${rootReducer}`)
*/
console.log(`DEBUG state 2 ${JSON.stringify(store.getState())}`)

/*
const ShowWord = () => {
  const wordArr = useSelector(handleTargetWord)

  const renderWordArray = wordArr.map((ltr: letter) => {
    return <span>{ltr.lit}</span>
  })

  return <p>{renderWordArray}</p>
}

 */

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hangman
        </p>
      </header>
        <LetterGuessCounter />
        <WordView />
        <LetterGrid />
        <WordGuessForm />
        <WordGuessCounter />
        <ShowGuessed />
        <ResetButton />
        <NewGameButton />
        <RevealButton />
    </div>
  );
};

export default App;
