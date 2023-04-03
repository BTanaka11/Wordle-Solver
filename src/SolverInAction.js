import React from 'react';

export const SolverInAction = ({setGuess, botWindow, addGuessColorsAndSetGuesses, infoTheoryDataStructure, topX, timeEach}) => {

  const [top5Array, setTop5Array] = React.useState(new Array(topX).fill(null).map(()=>(['',''])));
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

  React.useEffect(()=> {
    let timerz;
    if (currentWordIndex < infoTheoryDataStructure.wordSpace.length - 1) {
      timerz = setTimeout(()=> {
        let word = infoTheoryDataStructure.wordSpace[currentWordIndex];
        let score = infoTheoryDataStructure.checkGuess(word);
        let top5Temp = [...top5Array];
        let i = topX - 1;
        while (i >=0 && (top5Temp[i][1] === '' || score > top5Temp[i][1])) {
          if (i <= topX) {
            top5Temp[i + 1] = [top5Temp[i][0], top5Temp[i][1]];
          };
          top5Temp[i] = [word, score];
          i--;
        };
        setTop5Array(top5Temp);
        setCurrentWordIndex(a=>a+1);
        }, timeEach);
    } else {
      setGuess(top5Array[0][0]);
      addGuessColorsAndSetGuesses();
      clearTimeout(timerz);
    }
    return () => clearTimeout(timerz);
  }, [top5Array, currentWordIndex, infoTheoryDataStructure, topX, timeEach, setGuess, addGuessColorsAndSetGuesses]);

  return (
    <div >

      <table key={botWindow} id="topxTable" className='orange'>
        <caption>{infoTheoryDataStructure.wordSpace[currentWordIndex]}</caption>
        <thead>
          <tr>
            <th>Top {topX} Words</th>
            <th>Info Gained (bits)</th>
          </tr>
        </thead>
        <tbody>
          {top5Array.map((word, index)=> (
            <tr key = {index} style={{height: '25px'}}>
              <td>{word[0]}</td>
              <td>{word[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}