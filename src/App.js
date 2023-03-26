import './App.css';
import {Row} from './Row.js';
import React from 'react';
import {getRandomWord} from './helperFunctions.js';
import wordList from './wordList.txt';
import {InformationTheoryPlayer} from './InformationTheoryPlayer.js';

const blankGuesses = new Array(6).fill(null);

function App() {

  const [word, setWord] = React.useState(null);
  const [lengthz, setLengthz] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guessz, setGuessz] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [guess, setGuess] = React.useState(null);

  const resetGame = () => {
    fetch(wordList)
    .then(response => response.text())
    .then(text=> text.split(/\r?\t|\n/))
    .then(res=>{
      let randomIndex = Math.floor(Math.random() * res.length);
      setMode('gaming');
      setWord(res[randomIndex]);
      setLengthz(5);
      setCurrentRow(0);
      setGuess('');
      setGuessz(blankGuesses);
    })
  }

  React.useEffect(()=> {
    resetGame();
  },[]);

  if (!guessz) {
    return <div>loading...</div>
  }

  return (
    <div id ="outerOuter">
      <div>
        <h1>Wordle Solver: {word}</h1>
        <div id="board">
          {guessz.map((item, index)=> (
            <Row key={index} word={word} guess={guessz[index]}></Row>
          ))}

        </div>

        {mode === 'gaming' && <div>
        <input type="text" maxLength={lengthz} placeholder="enter guess" onChange={((e)=>{setGuess(e.target.value)})} value={guess}></input>
        <input type="submit" disabled={guess.length < lengthz} onClick={()=>{
          let temp = [...guessz];
          temp[currentRow] = guess;
          setGuessz(temp);
          if (guess === word) {
            setMode('won');
          } else if (currentRow === 5) {
            setMode('lost');
          } else {
            setCurrentRow(a=>a+1);
            setGuess('');
          }

        }}></input>
        </div>}
        {mode==='won' && <div>You won in {currentRow} tries!
          <button onClick={resetGame}>Play Again</button>
        </div>}
        {mode==='lost' && <div>You lost!
          <button onClick={resetGame}>Play Again</button>
        </div>}

      </div>

      <div id="stats">
        <InformationTheoryPlayer></InformationTheoryPlayer>
      </div>
    </div>
  );
}

export default App;
