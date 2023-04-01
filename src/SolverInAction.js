import React from 'react';

export const SolverInAction = ({setGuess, botWindow, addGuessColorsAndSetGuesses, infoTheoryDataStructure}) => {

  const [top5Array, setTop5Array] = React.useState(new Array(5).fill(null).map(()=>(['',''])));
  const [currentWord, setCurrentWord] = React.useState('');
  console.log('inside solver!')
  if (!top5Array) {return <div>waiting...</div>}
  console.log(top5Array)
  infoTheoryDataStructure.wordSpace.forEach((word)=> {

    setCurrentWord(word);
    let score = infoTheoryDataStructure.checkGuess(word);
    let top5Temp = [...top5Array];
    let i = 4;
    console.log(top5Temp)
    while ((top5Temp[i][1] === '' || score > top5Temp[i][1]) && i >=0) {
      console.log('inside')
      if (i < 4) {
        top5Temp[i + 1] = [top5Temp[i][0], top5Temp[i][1]];
      };
      top5Temp[i] = [word, score];
      i--;
    }
    setTop5Array(top5Temp);
  })

  setGuess(top5Array[0][0]);
  addGuessColorsAndSetGuesses();

  return (
    <div>
      <div>{currentWord}</div>
      <table key={botWindow}>
        <tr>
          <th>Top 5 Words</th>
          <th>Info Gained (bits)</th>
        </tr>
        {top5Array.map((word, index)=> (
          <tr>
            <td>{word[0]}</td>
            <td>{word[1]}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}