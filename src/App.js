import React from 'react';
import './App.css';
import Row from './Row.js';
import wordList from './wordList.txt';
import RowStat from './RowStat.js';
import {getColors} from './helperFunctions.js';
import InfoTheoryWorld from './InfoTheoryWorld.js';
import {SolverInAction} from './SolverInAction.js';
import {BotAverage} from './BotAverage.js';
import {BotSpeedSetting} from './BotSpeedSetting.js';

export let infoTheoryDataStructure;

function App() {

  const [word, setWord] = React.useState(null);
  const [lengthz, setLengthz] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guesses, setGuesses] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [guess, setGuess] = React.useState(null);
  const [botSpeed, setBotSpeed] = React.useState(null);
  const [botScoreSum, setBotScoreSum] = React.useState(0);
  const [botGameCount, setbotGameCount] = React.useState(0);
  const [humanMove, setHumanMove] = React.useState(false);
  const [displaySolver, setdisplaySolver] = React.useState(false);

  const resetGame = () => (
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
    })
  )

  const addGuessColorsAndSetGuesses = React.useCallback(([guess1, entropy]) => {
    const handleWinLoss = () => {
      if (!humanMove) {
        setBotScoreSum(a=>a+currentRow+1);
        setbotGameCount(a=>a+1);
        setHumanMove(true);
      }
      if (guesses[currentRow].bot) {
        setTimeout(resetGame, 1600);
      }
    };
    if (displaySolver) {
      setdisplaySolver(false);
    }
    let temp = [...guesses];

    //right here is where, if AI is playing, it should get optimal guess and display visuals and return GUESS for use in line below.
    let colors = getColors(word, guess1);
    let stats = {
      wordCountBefore: infoTheoryDataStructure.wordSpace.length,
      entropy: entropy
    };
    infoTheoryDataStructure.trimWordSpace(colors, guess1);
    stats.wordCountAfter = infoTheoryDataStructure.wordSpace.length;

    if (temp[currentRow].guessWord === null) {
      temp[currentRow] = {guessWord: guess1, guessColors: colors, guessStats: stats, bot:botSpeed > 0 ? true: false};
      setGuesses(temp);
    }

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

  }, [botSpeed, currentRow, guesses, word, humanMove, displaySolver])

  React.useEffect(()=> {
    resetGame();
  }, []);

  React.useEffect(()=> {
    let interval1;
    let interval2;
    let interval3;
    if (botSpeed === 1) {
      interval1 = setInterval(()=> {
        setdisplaySolver(true);
      }, 2000);

    } else {
      setdisplaySolver(false);
      clearInterval(interval1);
    }

    if (botSpeed === 2) {
      interval2 = setInterval(()=> {
        addGuessColorsAndSetGuesses(infoTheoryDataStructure.getBestGuess())
      }, 2000);
    } else {
      clearInterval(interval2);
    }
    if (botSpeed === 3) {

      interval3 = setInterval(()=> {
        resetGame();
        infoTheoryDataStructure.wordSpace = [...infoTheoryDataStructure.orgiginalWordSpace];
        let bestGuess = null;
        let actualWord = infoTheoryDataStructure.wordSpace[infoTheoryDataStructure.index];
        let roundCount = 0;
        while (roundCount < 6 && bestGuess !== actualWord) {
          [bestGuess] = infoTheoryDataStructure.getBestGuess();
          let colorz = getColors(actualWord, bestGuess).join('');
          infoTheoryDataStructure.trimWordSpace(colorz, bestGuess);
          roundCount++;
        }
        setBotScoreSum(a=>a+roundCount);
        setbotGameCount(a=>a+1);
        if (infoTheoryDataStructure.index === infoTheoryDataStructure.originalWordSpaceLength - 1) {
          setBotSpeed(0);
          resetGame();
        } else {
          infoTheoryDataStructure.index ++;
        };
      }, 10);
    } else {
      clearInterval(interval3);
    }

    return ()=>{clearInterval(interval2); clearInterval(interval3); clearInterval(interval1)};
  }, [botSpeed, addGuessColorsAndSetGuesses, lengthz]);

  if (!guesses) {
    return <div>loading...</div>
  }

  return (
    <div id ="outerOuter">
      <div>
        <div id="buttonContainer">
          <BotSpeedSetting setBotSpeed={setBotSpeed} mode={mode}></BotSpeedSetting>
          <BotAverage count={botGameCount} average={(botScoreSum/botGameCount).toFixed(2)}></BotAverage>
        </div>
        <div id="board">
          {guesses.map((item, index)=> (
            <Row key={index} word={word} guess={item}></Row>
          ))}
        </div>
        {mode === 'gaming' && !botSpeed && <div>
        <input className="inputPart" type="text" maxLength={lengthz} placeholder="enter guess..." onChange={((e)=>{setGuess(e.target.value.toLowerCase())})} value={guess}></input>
        <input className="inputPart" type="submit" disabled={guess.length < lengthz} onClick={()=>{
          if (infoTheoryDataStructure.validateGuess(guess)) {
            setHumanMove(true);
            addGuessColorsAndSetGuesses([guess, infoTheoryDataStructure.checkGuess(guess)]);
          } else {
            alert('Invalid word!');
          }

          }}></input>
        </div>}

        {mode!=='gaming' && <div>{mode === 'won' ? `Won in ${currentRow + 1} tries!` : `Lost! The answer was ${word}.`}
          {!botSpeed && <button onClick={resetGame}>Play Again</button>}
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
      {displaySolver && <SolverInAction addGuessColorsAndSetGuesses={addGuessColorsAndSetGuesses} topX={10}></SolverInAction>}

    </div>
  );
}

export default App;
