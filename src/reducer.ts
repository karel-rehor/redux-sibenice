import { AnyAction } from 'redux'

import {initialState} from "./AppState";
import {ASCII_UPPER, findIndexes, getLetterByCode, getLettersFromString} from "./features/pool/letterPool";
import {getStringFromLetters, setCharsInString} from "./features/words/word";

export default function appReducer(state = initialState, action: AnyAction){
    switch(action.type){
        case 'init':
            const ts = getLettersFromString(action.payload.targetString.toUpperCase())
            const gs = action.payload.targetString.replace(/\w/g, '*');
            return {
                ...state,
                letters: getLettersFromString(ASCII_UPPER),
                targetWord: ts,
                maxLetters: action.payload.maxLetters,
                maxGuesses: action.payload.maxGuesses,
                letterCount: 0,
                guessString: gs,
                guesses: [],
                guessed: false
            }
        case 'guessLetter':
            //if reached max letters no more guessing
            //console.log(`DEBUG guessing letter ${action.payload}`)
            if( state.letterCount === state.maxLetters){
                return state;
            }
            const ltrs = state.letters
            //make deep copy - has to remain immutable
            let letters = [...ltrs]
            //deep copy each letter
            // N.B. if altChars implemented contents also will need deep copy
            for(let i = 0; i < state.letters.length; i++){
                letters[i] = { char: state.letters[i].char,
                            altChars: state.letters[i].altChars,
                            used: state.letters[i].used,
                            lit: state.letters[i].lit
                            }
            }
            // end deep copy of each letter
            const char = typeof action.payload === 'number' ? action.payload : action.payload.charCodeAt(0)
            let letter = getLetterByCode(letters, char);
            if(!letter || (letter && letter.used)){
                return state;
            }
            letter.used = true
            let indexes = findIndexes(state.targetWord, char)
            let ltrCt = state.letterCount;
            return{
                ...state,
                letters: letters,
                guessString: setCharsInString(state.guessString, indexes, String.fromCharCode(char)),
                letterCount: indexes.length > 0 ? ltrCt : state.letterCount + 1
            }
        case 'guessWord':
            //no more guesses after reached max
            if(state.guesses.length === state.maxGuesses){
                return state;
            }
            const guess = action.payload.toUpperCase();
            let guesses = state.guesses
            let gss = [...guesses]
            let matched = getStringFromLetters(state.targetWord) === guess
            let gString = state.guessString
            gss.push(guess)
            //console.log(`DEBUG matcher ${getStringFromLetters(state.targetWord)} : ${guess}`)
            return {
                ...state,
                guessed: matched,
                guesses: gss,
                guessString: matched ? getStringFromLetters(state.targetWord) : gString
            };
        case 'reset':
            //console.log('DEBUG Resetting')
            let twLtrs = state.targetWord;
            let guessStr = state.guessString;
            let twHolder = [...twLtrs]
            return {
                ...initialState,
                letters: getLettersFromString(ASCII_UPPER),
                targetWord: twHolder,
                guessString: guessStr.replace(/\w/g, '*')

            };
        case 'reveal':
            const guessArr = new Array(state.maxGuesses)
            return {
                ...state,
                guessString : getStringFromLetters(state.targetWord),
                letterCount: state.maxLetters,
                guesses: guessArr
            };
        default:
            return state;
    }
}
