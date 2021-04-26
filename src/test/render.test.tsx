import React, {ReactElement, ReactComponentElement} from 'react'
import axios from 'axios'
import { render, fireEvent, screen } from '@testing-library/react'
import { createStore } from 'redux'
import "@testing-library/jest-dom/extend-expect";

import WordView from '../features/words/wordView'
import LetterGrid from '../features/pool/letterGrid'
import appReducer from "../reducer";
import {hmState, initialState} from "../AppState";
import {initialize} from "../actions/actions";
import {Provider} from "react-redux";

const targetString = 'leopard'
const MAX_GUESS = 3
const MAX_LETTER = 10

const mockCallback = jest.fn(x => x * x)
const bareMock = jest.fn();

jest.mock('axios')

/*
for debugging
 */
/*
const Component = () => {
    return <div />
}
 */


const renderWithState = (ui: any, { initialState, ...renderOptions} : any = {}) => {
    const lStore = createStore(appReducer, initialState)


    function Wrapper( { children } : any ){
       return <Provider store={lStore}>{children}</Provider>
    }

    return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe('sample render test', () => {

    let state: hmState

    beforeEach(()=> {
        state = appReducer(initialState,
            initialize({targetString: targetString,
                maxGuesses: MAX_GUESS,
                maxLetters: MAX_LETTER}))
    })

    it('renders something', () => {

        const { getByText } = renderWithState(<WordView/>,{initialState: state})

        expect(getByText('*******')).toBeInTheDocument()

    })

    it( 'renders something more complex', () => {

        // See
        // https://testing-library.com/docs/react-testing-library/api/#render-result
        const {container, debug } = renderWithState(<LetterGrid />, {initialState: state})

        for(let i = 'A'.charCodeAt(0); i < 'Z'.charCodeAt(0) + 1; i++){
            expect(container.querySelector(`[id='${i}']`)).not.toBeNull()
        }

        //Can also inspect entire element
        debug()

    })

    it( 'fires an event', async () => {

        const {container, debug } = renderWithState(<LetterGrid />, {initialState: state})

        fireEvent.click(container.querySelector(`[id='${'A'.charCodeAt(0)}']`) as Element)

        const letter = await screen.getByTestId('lttr' + 'A'.charCodeAt(0))

        expect(letter.style.textDecoration).toEqual('line-through')

    })

    it('tries mock callback', async ()=> {
        const myArray: number[] = [1,2,3,4,5]

        myArray.forEach(mockCallback)

        console.log(`DEBUG bareMock ${JSON.stringify(bareMock)}`)

        console.log(`DEBUG mockCallback.mock.calls.length ${mockCallback.mock.calls.length}`)
        expect(mockCallback.mock.calls.length).toBe(5)
        expect(mockCallback.mock.calls[0][0]).toBe(1)
        expect(mockCallback.mock.calls[1][0]).toBe(2)
        expect(mockCallback.mock.calls[2][0]).toBe(3)
        expect(mockCallback.mock.results[0].value).toBe(1)
        expect(mockCallback.mock.results[4].value).toBe(25)

        console.log(`DEBUG mockCallback.mock.calls[1] ${JSON.stringify(mockCallback.mock.calls[1])}`)

        console.log(`DEBUG mockCallback.mock.results[3] ${JSON.stringify(mockCallback.mock.results[3])}`)

        bareMock.mockReturnValueOnce(36)
            .mockReturnValueOnce('Buggles')
            .mockReturnValue({ id: "alpha", value: "Video killed the radio star" })

        console.log(`DEBUG bareMock ${bareMock()}`)
        console.log(`DEBUG bareMock ${bareMock()}`)
        console.log(`DEBUG bareMock ${JSON.stringify(bareMock())}`)

    })

    it('fetches mock users', async () => {
        const users = [{name: 'Barbara'}]
        const resp = {data: users}

        // @ts-ignore
        const result = axios.get.mockResolvedValue(resp)

        result().then((data: any) => {
            expect(data.name).toEqual( 'Barbara')
        })
    })

})
