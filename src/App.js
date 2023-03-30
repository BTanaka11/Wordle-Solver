import './App.css';
import {Row} from './Row.js';
import React from 'react';
import {getRandomWord} from './helperFunctions.js';
import wordList from './wordList.txt';
import {RowStat} from './RowStat.js';
import {getColors} from './helperFunctions.js';
import {infoTheoryDataStructure} from './InfoTheoryWorld.js';

let infoTheoryData = infoTheoryDataStructure();

function App() {

  const [word, setWord] = React.useState(null);
  const [lengthz, setLengthz] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guesses, setGuesses] = React.useState(null);
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
      let blankGuessList = new Array(6).fill(null).map(()=>({guessWord: null, guessColors: new Array(5).fill('beige'), guessStats: null}));
      setGuesses(blankGuessList);
      infoTheoryData.reset();
    })
  }
  React.useEffect(()=> {
    resetGame();
  }, []);

  if (!guesses) {
    return <div>loading...</div>
  }

  const addGuessColorsAndSetGuesses = () => {
    let temp = [...guesses];
    let colors = getColors(word, guess);
    let stats = {
      wordCountBefore: infoTheoryData.wordSpace.length,
      entropy: infoTheoryData.checkGuess(guess)
    };
    infoTheoryData.trimWordSpace(colors, guess);
    stats.wordCountAfter = infoTheoryData.wordSpace.length;
    stats.percentReduction = (stats.wordCountBefore - stats.wordCountAfter) / stats.wordCountBefore;

    temp[currentRow] = {guessWord: guess, guessColors: colors, guessStats: stats};
    setGuesses(temp);
    if (guess === word) {
      setMode('won');
    } else if (currentRow === 5) {
      setMode('lost');
    } else {
      setCurrentRow(a=>a+1);
      setGuess('');
    }
  }

  return (
    <div id ="outerOuter">
      <div>
        <div id="board">
          {guesses.map((item, index)=> (
            <Row key={index} word={word} guess={guesses[index]}></Row>
          ))}
        </div>
        {mode === 'gaming' && <div>
        <input type="text" maxLength={lengthz} placeholder="enter guess" onChange={((e)=>{setGuess(e.target.value)})} value={guess}></input>
        <input type="submit" disabled={guess.length < lengthz} onClick={addGuessColorsAndSetGuesses}></input>
        </div>}
        {mode==='won' && <div>You won in {currentRow + 1} tries!
          <button onClick={resetGame}>Play Again</button>
        </div>}
        {mode==='lost' && <div>You lost!
          <button onClick={resetGame}>Play Again</button>
        </div>}
        <span>Answer: {word}</span>
      </div>
      <div id="statsboard">
        {guesses.filter((item)=>(item.guessStats !== null)).map((item, index)=> (
          <RowStat guessStats={item.guessStats} key={index}></RowStat>
        ))}
      </div>
    </div>
  );
}

export default App;
