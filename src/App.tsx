import React from 'react';
import './App.css';

import LetterGrid from './features/pool/letterGrid'
import WordView from './features/words/wordView'
import LetterGuessCounter from './features/words/letterGuessCounter'
import WordGuessForm from './features/words/wordGuessForm'
import WordGuessCounter from './features/words/wordGuessCounter'
import ShowGuessed from './features/words/ShowGuessed'
import ResetButton from './features/game/resetButton'
import NewGameButton from './features/game/newGameButton'
import RevealButton from './features/game/revealButton'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hangman
        </p>
      </header>
        <LetterGuessCounter />
        <WordView />
        <LetterGrid />
        <WordGuessForm />
        <WordGuessCounter />
        <ShowGuessed />
        <ResetButton />
        <NewGameButton />
        <RevealButton />
    </div>
  );
}

export default App;
