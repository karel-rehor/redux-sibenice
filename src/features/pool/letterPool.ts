import { letter, letterArrayFromString, letterArrayGetter } from '../../types/letter'

export const ASCII_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const getLettersFromString : letterArrayFromString = function(letters: string): letter[]{
    let result: letter[] = []
    letters
        .trim()
        .split('')
        .map((ch) => (
            result.push({char: ch.charCodeAt(0), altChars: [], used: false, lit: ch})
        ))
    console.log('DEBUG result ' + JSON.stringify(result))
    return result;
}

export function setAltChars(letter: letter, alts: string){
    alts
        .trim()
        .split('')
        .map((ch) => (
            letter.altChars.push(ch.charCodeAt(0))
        ))
}

export function getLetter(letters: letter[], ch: string, index = 1): letter | undefined {
    //for now just get first match
    return letters.find( letter => letter.char === ch.charCodeAt(0))
}

export function getLetterByCode(letters: letter[], letter: number): letter | undefined {
    return letters.find( ltr => ltr.char === letter)
}

export function matchLetter(letters: letter[], ch: string): letter[] {
    return letters.filter((ltr) =>  ltr.char === ch.charCodeAt(0) )
}

export function matchLetterByCode(letters: letter[], letter: number): letter[] {
    return letters.filter((ltr) =>  ltr.char === letter )
}

export function findIndexes(letters: letter[], letter: number): number[] {
    let result : number[] = [];
    for(let i: number = 0; i < letters.length; i++){
        if(letters[i].char === letter){
            result.push(i)
        }
    }
    return result;
}

const letters: letter[] = getLettersFromString(ASCII_UPPER)

export const getLetters : letterArrayGetter = function() {
    return letters;
}



