"use strict"
import appReducer from '../reducer'
import { initialState, hmState } from '../AppState'
import { getLettersFromString } from '../features/pool/letterPool'
import {
   initialize,
    guessLetter,
    guessLetterByCode,
    guessWord,
    reset,
    reveal
} from '../actions/actions'

/*
Purpose of deepFreeze is to make sure state object remains IMMUTABLE
  i.e. only copies are allowed to be made and updated
 */
const deepFreeze = (obj: Object) => {

    Object.keys(obj).forEach(prop => {
        // @ts-ignore
        if(typeof obj[prop] === 'object'  && !Object.isFrozen(obj[prop])){
            // @ts-ignore
            deepFreeze(obj[prop])
        }
    })
    return Object.freeze(obj)
}

describe('sample test', () => {

    const targetString = 'leopard'
    const MAX_GUESS = 3
    const MAX_LETTER = 10
    let state: hmState

    beforeEach(() => {
        state = appReducer(initialState,
            initialize({targetString: targetString,
                maxGuesses: MAX_GUESS,
                maxLetters: MAX_LETTER}))
        deepFreeze(state)
    })

    const setupSimpleMockState = () => {
        //setup mock game state
        state = appReducer(state, guessLetter('A'))
        state = appReducer(state, guessLetter('R'))
        state = appReducer(state, guessLetter('S'))
        state = appReducer(state, guessLetter('E'))
        state = appReducer(state, guessWord('CHEETAH'))

        let guessString = targetString.toUpperCase().replace(/[B-D,F-Q,T-Z]/g, '*')

        //verify mock game state
        expect(state.guessString).toEqual(guessString)

        let match = state.letters.find(( letter ) => letter.lit === 'A' )
        expect(match).toEqual({char:65,altChars:[],used:true,lit:"A"})

        match = state.letters.find(( letter ) => letter.lit === 'E' )
        expect(match).toEqual({char:69,altChars:[],used:true,lit:"E"})

        match = state.letters.find(( letter ) => letter.lit === 'R' )
        expect(match).toEqual({char:82,altChars:[],used:true,lit:"R"})

        match = state.letters.find(( letter ) => letter.lit === 'S' )
        expect(match).toEqual({char:83,altChars:[],used:true,lit:"S"})

        expect(state.letterCount).toBe(1)

        expect(state.guesses.length).toBe(1)
        expect(state.guesses).toContain('CHEETAH')
    }

    it('passes', () => {
        expect(true).toBe(true)
        const myObject = {name: 'thing', value: 'it is a thing'}
        deepFreeze(myObject)
        // true to change frozen object
        // myObject.value = 'to je vec'
    })

    it( 'initializes state', () => {
        Object.freeze(state)
        for(let i = 0; i < 26; i++){
            expect(state.letters[i]).toEqual({char: i + 65,
                altChars: [],
                used: false,
                lit: String.fromCharCode(i + 65)})
        }

        const letterArray = getLettersFromString(targetString.toUpperCase())

        for(let i = 0; i < letterArray.length; i++){
            expect(state.targetWord[i]).toEqual(letterArray[i])
        }

        const guessString = targetString.replace(/\w/g, '*')

        expect(state.guessString).toEqual(guessString)

        expect(state.maxGuesses).toBe(MAX_GUESS)

        expect(state.maxLetters).toBe(MAX_LETTER)

        expect(state.letterCount).toBe(0)

        expect(state.guessed).toBe(false)

        console.log(`DEBUG state ${JSON.stringify(state)}`)
    })

    it('guesses non-matching letter', () => {

        state = appReducer(state, guessLetter('S'))

        const guessString = targetString.replace(/\w/g, '*')
        expect(state.guessString).toEqual(guessString)

        const match = state.letters.find(( letter ) => letter.lit === 'S' )
        expect(match).toEqual({char:83,altChars:[],used:true,lit:"S"})
    })

    it('guesses matching letter', () => {
        state = appReducer(state, guessLetter('P'));
        const guessString = targetString.toUpperCase().replace(/[A-O,Q-Z]/g, '*')
        expect(state.guessString).toEqual(guessString)

        const match = state.letters.find(( letter ) => letter.lit === 'P' )
        expect(match).toEqual({char:80,altChars:[],used:true,lit:"P"})
    })

    it('guessLetterByCode', () => {
        const code = 'Z'.charCodeAt(0)
        state = appReducer(state, guessLetterByCode(code))

        const guessString = targetString.replace(/\w/g, '*')
        expect(state.guessString).toEqual(guessString)

        const match = state.letters.find(( letter ) => letter.char === code )
        expect(match).toEqual({char:code,altChars:[],used:true,lit:"Z"})

    })

    it('guesses wrong word', () => {
        state = appReducer(state, guessWord('LEONARD'));

        const guessString = targetString.replace(/\w/g, '*')
        expect(state.guessString).toEqual(guessString)

        expect(state.guesses.length).toBe(1)
        expect(state.guesses).toContain('LEONARD')
        expect(state.guessed).toBe(false)
    })

    it('guesses right word', () => {
        state = appReducer(state, guessWord('LEOPARD'));
        expect(state.guessString).toEqual(targetString.toUpperCase())
        expect(state.guesses.length).toBe(1)
        expect(state.guesses).toContain('LEOPARD')
        expect(state.guessed).toBe(true)
    })

    it('resets the game', () => {
        setupSimpleMockState()

        deepFreeze(state)
        state = appReducer(state, reset())

        const guessString = targetString.replace(/\w/g, '*')
        expect(state.guessString).toEqual(guessString)

        let match = state.letters.find(( letter ) => letter.lit === 'A' )
        expect(match).toEqual({char:65,altChars:[],used:false,lit:"A"})

        match = state.letters.find(( letter ) => letter.lit === 'E' )
        expect(match).toEqual({char:69,altChars:[],used:false,lit:"E"})

        match = state.letters.find(( letter ) => letter.lit === 'R' )
        expect(match).toEqual({char:82,altChars:[],used:false,lit:"R"})

        match = state.letters.find(( letter ) => letter.lit === 'S' )
        expect(match).toEqual({char:83,altChars:[],used:false,lit:"S"})

        expect(state.letterCount).toBe(0)
        expect(state.guesses.length).toBe(0)


    })

    it('reveals the word', () => {
        setupSimpleMockState()

        deepFreeze(state)
        state = appReducer(state, reveal())

        expect(state.guessString).toEqual(targetString.toUpperCase())
        expect(state.letterCount).toBe(state.maxLetters)
        expect(state.guesses.length).toBe(state.maxGuesses)
        expect(state.guessed).toBe(false)
    })
})
