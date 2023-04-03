import './App.css';
import {Row} from './Row.js';
import React from 'react';
import wordList from './wordList.txt';
import {RowStat} from './RowStat.js';
import {getColors} from './helperFunctions.js';
import InfoTheoryWorld from './InfoTheoryWorld.js';
import {SolverInAction} from './SolverInAction.js';

// let infoTheoryData = infoTheoryDataStructure();
let infoTheoryDataStructure;

function App() {

  const [word, setWord] = React.useState(null);
  const [lengthz, setLengthz] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guesses, setGuesses] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [guess, setGuess] = React.useState(null);
  const [botActive, setBotActive] = React.useState(null);
  const [botWindow, setBotWindow] = React.useState(null);

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
      infoTheoryDataStructure = new InfoTheoryWorld(res);
      setBotActive(false);
      setBotWindow(0);
    })
  }
  React.useEffect(()=> {
    resetGame();
  }, []);

  React.useEffect(()=> {
    let interval = null;
    if (botActive && mode === 'gaming') {
      interval = setInterval(()=> {
        setBotWindow(a=>a + 1);
      }, 20000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [botActive, mode, botWindow]);

  if (!guesses) {
    return <div>loading...</div>
  }

  const addGuessColorsAndSetGuesses = () => {
    let temp = [...guesses];

    //right here is where, if AI is playing, it should get optimal guess and display visuals and return GUESS for use in line below.
    let colors = getColors(word, guess);
    let stats = {
      wordCountBefore: infoTheoryDataStructure.wordSpace.length,
      entropy: infoTheoryDataStructure.checkGuess(guess)
    };
    infoTheoryDataStructure.trimWordSpace(colors, guess);
    stats.wordCountAfter = infoTheoryDataStructure.wordSpace.length;

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

  const classLabelForColoring = () => (botActive ? 'orange' : 'blue');

  return (
    <div id ="outerOuter">
      <div id="leftColumn">
        <div id="buttonContainer">
          <button className={classLabelForColoring()} onClick={()=>(setBotActive(a=>!a))}>Turn {botActive ? 'Off': 'On'} Bot</button>
        </div>
        <div id="board">
          {guesses.map((item, index)=> (
            <Row key={index} word={word} guess={guesses[index]}></Row>
          ))}
        </div>
        {mode === 'gaming' && <div>
        <input type="text" maxLength={lengthz} placeholder="enter guess" onChange={((e)=>{setGuess(e.target.value)})} value={guess}></input>
        <input type="submit" disabled={guess.length < lengthz} onClick={addGuessColorsAndSetGuesses}></input>
        </div>}
        {mode==='won' && <div>Won in {currentRow + 1} tries!
          <button onClick={resetGame}>Play Again</button>
        </div>}
        {mode==='lost' && <div>Lost! The answer was {word}
          <button onClick={resetGame}>Play Again</button>
        </div>}
        {/* <span>Answer: {word}</span> */}
      </div>

      <div id="statsANDwindow" >
        <table id="statsboard">
          <thead>
            <tr>
              <th>Possibilities</th>
              <th>Uncertainty (bits)</th>
              <th>Guess's Expected Gain (bits)</th>
              <th>Guess's Actual Gain (bits)</th>
            </tr>
          </thead>
          <tbody>
            {guesses.filter((item)=>(item.guessStats !== null)).map((item, index)=> (
              <RowStat guessStats={item.guessStats} key={index} className={classLabelForColoring()}></RowStat>
            ))}
          </tbody>
        </table>
      </div>
      {botActive && <SolverInAction setGuess={setGuess} botWindow={botWindow} addGuessColorsAndSetGuesses={addGuessColorsAndSetGuesses} infoTheoryDataStructure={infoTheoryDataStructure} topX={10} timeEach={Math.floor(6000 / infoTheoryDataStructure.wordSpace.length)}></SolverInAction>}
    </div>
  );
}

export default App;
