import './App.css';
import {Row} from './Row.js';
import React from 'react';
import wordList from './wordList.txt';
import {RowStat} from './RowStat.js';
import {getColors} from './helperFunctions.js';
import InfoTheoryWorld from './InfoTheoryWorld.js';
import {SolverInAction} from './SolverInAction.js';
import {BotAverage} from './BotAverage.js';
import {BotSpeedSetting} from './BotSpeedSetting.js';

// let infoTheoryData = infoTheoryDataStructure();
export let infoTheoryDataStructure;

function App() {

  const [word, setWord] = React.useState(null);
  const [lengthz, setLengthz] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guesses, setGuesses] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [guess, setGuess] = React.useState(null);
  const [botSpeed, setBotSpeed] = React.useState(null);
  const [botWindow, setBotWindow] = React.useState(null);
  const [botScoreSum, setBotScoreSum] = React.useState(0);
  const [botGameCount, setbotGameCount] = React.useState(0);
  const [humanMove, setHumanMove] = React.useState(false);

  const resetGame = () => {
    console.log('reset!')
    fetch(wordList)
    .then(response => response.text())
    .then(text=> text.split(/\r?\t|\n/))
    .then(res=>{
      let randomIndex = Math.floor(Math.random() * res.length);
      setMode('gaming');
      setHumanMove(false);
      setWord(res[randomIndex]);
      setLengthz(5);
      setCurrentRow(0);
      setGuess('');
      let blankGuessList = new Array(6).fill(null).map(()=>({guessWord: null, guessColors: new Array(5).fill('beige'), guessStats: null}));
      setGuesses(blankGuessList);
      if (!infoTheoryDataStructure) {
        infoTheoryDataStructure = new InfoTheoryWorld(res);
      } else {
        infoTheoryDataStructure.wordSpace = res;
      }
      // setBotSpeed(0);
      // setBotWindow(0);
    })
  }

  const addGuessColorsAndSetGuesses = React.useCallback((guess1) => {
    const handleWinLoss = () => {
      if (!humanMove) {
        setBotScoreSum(a=>a+currentRow+1);
        setbotGameCount(a=>a+1);
      }
      setTimeout(resetGame, 2000);
    };

    let temp = [...guesses];
    let tempBotActive = false;
    if (botSpeed === 1) {
      setBotWindow(0);
      tempBotActive = true;
    }

    //right here is where, if AI is playing, it should get optimal guess and display visuals and return GUESS for use in line below.
    let colors = getColors(word, guess1);
    let stats = {
      wordCountBefore: infoTheoryDataStructure.wordSpace.length,
      entropy: infoTheoryDataStructure.checkGuess(guess1)
    };
    infoTheoryDataStructure.trimWordSpace(colors, guess1);
    stats.wordCountAfter = infoTheoryDataStructure.wordSpace.length;

    temp[currentRow] = {guessWord: guess1, guessColors: colors, guessStats: stats, bot:botSpeed > 0 ? true: false};
    setGuesses(temp);
    if (guess1 === word) {
      setMode('won');
      handleWinLoss()
    } else if (currentRow === 5) {
      setMode('lost');
      handleWinLoss();
    } else {
      setCurrentRow(a=>a+1);
      setGuess('');
    }
    if (tempBotActive) {
      setTimeout(()=> {
        setBotWindow(a=>a+1);
      }, 2500);
    }
  }, [botSpeed, currentRow, guesses, word, humanMove])

  React.useEffect(()=> {
    resetGame();
  }, []);

  React.useEffect(()=> {
    let interval;
    if (botSpeed === 1) {
      setBotWindow(a=>a+1)
    } else {
      setBotWindow(0)
    }
    if (botSpeed === 2) {
      interval = setInterval(()=> {
        addGuessColorsAndSetGuesses(infoTheoryDataStructure.getBestGuess())
      }, 2500);
    } else {
      clearInterval(interval);
    }
    return ()=>clearInterval(interval);
  }, [botSpeed, addGuessColorsAndSetGuesses]);

  if (!guesses) {
    return <div>loading...</div>
  }

  return (
    <div id ="outerOuter">
      <div id="leftColumn">
        <div id="buttonContainer">
          <BotSpeedSetting setBotSpeed={setBotSpeed}></BotSpeedSetting>
          <BotAverage count={botGameCount} average={(botScoreSum/botGameCount).toFixed(2)}></BotAverage>
        </div>
        <div id="board">
          {guesses.map((item, index)=> (
            <Row key={index} word={word} guess={item}></Row>
          ))}
        </div>
        {mode === 'gaming' && <div>
        <input type="text" maxLength={lengthz} placeholder="enter guess" onChange={((e)=>{setGuess(e.target.value)})} value={guess}></input>
        <input type="submit" disabled={guess.length < lengthz} onClick={()=>{
          setHumanMove(true);
          addGuessColorsAndSetGuesses(guess);
          }}></input>
        </div>}
        {mode==='won' && <div>Won in {currentRow + 1} tries!
          <button onClick={resetGame}>Play Again</button>
        </div>}
        {mode==='lost' && <div>Lost! The answer was {word}
          <button onClick={resetGame}>Play Again</button>
        </div>}
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
              <RowStat guessStats={item.guessStats} key={index} bot={item.bot}></RowStat>
            ))}
          </tbody>
        </table>
      </div>
      {botWindow > 0 && <SolverInAction botWindow={botWindow} addGuessColorsAndSetGuesses={addGuessColorsAndSetGuesses} infoTheoryDataStructure={infoTheoryDataStructure} topX={10} timeEach={Math.min(Math.floor(6000 / infoTheoryDataStructure.wordSpace.length), 500)}></SolverInAction>}

    </div>
  );
}

export default App;
