import React, {ReactElement, ReactComponentElement} from 'react'
import { render } from '@testing-library/react'
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

})
