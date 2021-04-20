
export const initialize = ({targetString, maxGuesses, maxLetters} :
                               {targetString: string,
                                maxGuesses: number,
                                maxLetters: number}) => (
    {type: 'init', payload: {targetString, maxGuesses, maxLetters}}
)

export const reset = () => ( {type: 'reset'})

export const reveal = () => ( {type: 'reveal'})

export const guessLetter = (letter: string) => (
    { type: 'guessLetter', payload: letter}
)

export const guessLetterByCode = (letter: number) => (
    { type: 'guessLetter', payload: letter}
)

export const guessWord = (word: string) => (
    { type: 'guessWord', payload: word}
)
