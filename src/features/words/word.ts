import {letter, letterArrayGetter} from "../../types/letter";
import list from './vocabulary'

export let targetWord: letter[] = []

export function setCharsInString(source: string, indexes: number[], val: string) : string {
    let result;
    let arr = source.split('');
    for(let i = 0; i < arr.length; i++){
        if(indexes.indexOf(i) > -1){
            arr[i] = val;
        }
    }
    result = arr.join('');
    return result;
}

export function getStringFromLetters(letters: letter[]): string {
    let result: string = '';
    letters.map( ({char}) => (
        result = result.concat(String.fromCharCode(char))
    ))
    return result;
}

export function setTargetWord(word: letter[]){
    targetWord = word;
}

export const getTargetWord: letterArrayGetter = function(){
    return targetWord;
}


export const getRandomWord = () => {
    return list[Math.floor(Math.random() * list.length)]
}

