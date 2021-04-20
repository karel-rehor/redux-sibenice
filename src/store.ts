import {createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from './reducer'
import { initialState } from './AppState'

const composedEnhancer = composeWithDevTools()

const store = createStore(appReducer, initialState, composedEnhancer)

export default store


