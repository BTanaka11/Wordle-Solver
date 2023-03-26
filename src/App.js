import './App.css';
import Row from './Row.js';
import React from 'react';
import PlayAgain from './PlayAgain.js';

const blankGuesses = new Array(6).fill(null);

function App() {

  const [word, setWord] = React.useState(null);
  const [length, setLength] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [guessz, setGuessz] = React.useState(null);
  const [mode, setMode] = React.useState('gaming');

  let guess = React.useRef(null);

  React.useEffect(()=> {
    if (mode === 'gaming') {
      setWord('train');
      setLength(5);
      setCurrentRow(0);
      setGuessz(blankGuesses);
    }
  },[mode]);

  return (
    <div>
      <h1>Wordle Solver</h1>
      <div id="board">
        {guessz.map((item, index)=> (
          <Row key={index} word={word} guess={guessz[index]}></Row>
        ))}

      </div>
      {mode==='gaming' && <form onSubmit={()=>{
        let temp = [...guessz];
        temp[currentRow] = guess.current.value;
        setGuessz(temp);
        if (guess.current.value === word) {
          setMode('won');
        }
        if (currentRow === 5) {
          setMode('lost');
        } else {
          setCurrentRow(a=>a+1);
        }
      }}>
        <input type="text" limit={length} placeHolder="enter guess" ref={guess}></input>
        <input type="submit"></input>
      </form>}
      {mode==='won' && <div>You won in {currentRow} tries!
        <PlayAgain setMode={setMode} />
      </div>}
      {mode==='lost' && <div>You lost!
        <PlayAgain setMode={setMode} />
      </div>}
    </div>
  );
}

export default App;
