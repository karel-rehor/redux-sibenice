import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import {Provider} from "react-redux";

store.dispatch({ type: 'init', payload: { targetString: 'gorilla', maxLetters: 10, maxGuesses: 3 }})

//store.dispatch({ type: 'guessWord', payload: 'banana'})

store.dispatch( { type: 'guessLetter', payload: 'L'})

store.dispatch( { type: 'guessLetter', payload: 'G'})

console.log(`DEBUG state ${JSON.stringify(store.getState())}`)

//store.dispatch({type: 'reveal'})

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
