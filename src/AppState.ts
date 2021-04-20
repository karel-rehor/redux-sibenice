import { letter } from './types/letter'
import {ASCII_UPPER, getLettersFromString} from './features/pool/letterPool'

export interface poolState {
    letters: letter[]
}

export interface gameState {
    targetWord: letter[]
    guesses: string[]
    letterCount: number
    maxLetters: 10,
    maxGuesses: 3
}

export interface hmState {
    letters: letter[]
    targetWord: letter[]
    guessString: string
    guesses: string[]
    letterCount: number
    maxLetters: number
    maxGuesses: number
    guessed: boolean
}

export const initialPool: poolState = {
    letters: []
}

export const initialGame: gameState = {
    targetWord: [],
    guesses: [],
    letterCount: 0,
    maxLetters: 10,
    maxGuesses: 3
}

export const initialState: hmState = {
    letters: getLettersFromString(ASCII_UPPER),
    targetWord: [],
    guessString: '',
    guesses: [],
    letterCount: 0,
    maxLetters: 10,
    maxGuesses: 3,
    guessed: false
}

//Examples
export const actions = [
    {type: 'init', payload: {word: '', maxLetters: 10, maxGuesses: 3}},
    {type: 'guessLetter', payload: 'A'.charCodeAt(0)},
    {type: 'guessWord', payload: ''},
    //clear guessWord and counts
    {type: 'reset', payload: undefined},
    {type: 'reveal', payload: undefined}
]
